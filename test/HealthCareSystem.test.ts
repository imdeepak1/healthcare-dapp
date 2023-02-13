import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("HealthCare System-DApp", function () {
  let HealthCareSystemIns: Contract,
    acc4: any,
    acc1: any,
    acc2: any,
    acc3: any,
    acc5: any;

  async function deployHealthCareSystem() {
    // Contracts are deployed using the first signer/account by default
    [acc1, acc2, acc3, acc4, acc5] = await ethers.getSigners();

    const abiCode = await ethers.getContractFactory("HealthCareSystem");
    HealthCareSystemIns = await abiCode.deploy();

    return { HealthCareSystemIns, acc1, acc2, acc3, acc4, acc5 };
  }
  describe("Doctor Section", function () {
    it("Doctor should be added successfully", async function () {
      const { HealthCareSystemIns } = await loadFixture(deployHealthCareSystem);
      await HealthCareSystemIns.connect(acc1).addDoctor(
        112,
        "Ram",
        "General",
        "Orthopedics",
        9239344239,
        "6b sector 4"
      );
      const abs = await HealthCareSystemIns.connect(acc1).getDoctorDetails(112);
      expect(abs[3]).to.equal("Orthopedics");
    });
    it("Return Error if Doctor already added with the respect to same address", async function () {
      await expect(
        HealthCareSystemIns.connect(acc1).addDoctor(
          112,
          "Ram",
          "General",
          "Orthopedics",
          9239344239,
          "6b sector 4"
        )
      ).to.be.revertedWith(
        "Address is already registered/associated with another Id"
      );
    });
    it("Return Error if Doctor Id is Incorrect", async function () {
      await expect(
        HealthCareSystemIns.connect(acc1).getDoctorDetails(142)
      ).to.be.revertedWith("Doctor Id is inccorect");
    });

    describe("Insurance Company Section", function () {
      it("Insurance company should be add successfully", async function () {
        await HealthCareSystemIns.connect(acc2).addInsurancecompany(
          142,
          "EXE Parma pvt. ltd.",
          92394239
        );
        const abs = await HealthCareSystemIns.connect(acc2).getInsuranceCompany(
          142
        );
        expect(abs[0]).to.equal("EXE Parma pvt. ltd.");
      });
      it("Return Error If insurance company is already added with respect to same address", async function () {
        await expect(
          HealthCareSystemIns.connect(acc2).addInsurancecompany(
            142,
            "EXE Parma pvt. ltd.",
            92394239
          )
        ).to.be.revertedWith(
          "Company or Address is already registerd/associated with another id"
        );
      });
      it("Return Error If Company or Address is not registered", async function () {
        await expect(
          HealthCareSystemIns.connect(acc4).getInsuranceCompany(142)
        ).to.be.revertedWith("Company or Address is not registered");
      });
      it("Add Not Coverd Medication In Insurance should be added successfully", async function () {
        await HealthCareSystemIns.connect(
          acc2
        ).addNotCoverdMedicationInInsurance("Metafox-FSF");
        const abs = await HealthCareSystemIns.connect(acc2).getInsuranceCompany(
          142
        );
        expect(abs[2][0]).to.equal("Metafox-FSF");
      });
      it("Return Error if Company or Address is not registered", async function () {
        await expect(
          HealthCareSystemIns.connect(acc1).addNotCoverdMedicationInInsurance(
            142
          )
        ).to.be.revertedWith("Company or Address is not registered");
      });
    });

    describe("Chemist Section", function () {
      it("Chemist should be added successfully", async function () {
        await HealthCareSystemIns.connect(acc3).addChemist(
          124,
          "Rajesh",
          "This is address",
          9239344239
        );
        const abs = await HealthCareSystemIns.connect(acc3).getchemistinfo(124);
        expect(abs[1]).to.equal("Rajesh");
      });

      it("Return Error if chemist already added with the respect to same Id or address", async function () {
        await expect(
          HealthCareSystemIns.connect(acc3).addChemist(
            1243,
            "Rajesh",
            "This is address",
            9239344239
          )
        ).to.be.revertedWith(
          "Chemist or Address is already registered with id"
        );
      });
      it("Return Error If Chemist Id is Incorrect", async function () {
        await expect(
          HealthCareSystemIns.connect(acc4).getchemistinfo(142)
        ).to.be.revertedWith("Chemist Id is Incorrect");
      });
    });

    describe("Patient-Treatment Section", function () {
      it("Patient should be add successfully", async function () {
        const ab = await HealthCareSystemIns.connect(acc4).addPatientInfo(
          1234,
          "I'm patientName",
          "This is address",
          94342,
          "b",
          142,
          9323
        );
        const abs = await HealthCareSystemIns.connect(acc4).getPatientInfo(
          1234
        );
        expect(abs[0]).to.equal("I'm patientName");
      });
      it("Return Error If Aadhar card or Address is already registerd/associated with another id", async function () {
        await expect(
          HealthCareSystemIns.connect(acc4).addPatientInfo(
            1234,
            "I'm patientName",
            "This is address",
            94342,
            "b",
            142,
            9323
          )
        ).to.be.revertedWith(
          "Aadhar card or Address is already registerd/associated with another id"
        );
      });
      it("Return Error If Insurance company is not registered", async function () {
        await expect(
          HealthCareSystemIns.connect(acc5).addPatientInfo(
            1453,
            "I'm patientName",
            "This is address",
            94342,
            "b",
            1443,
            9323
          )
        ).to.be.revertedWith("Insurance company is not registered");
      });

      it("Request Access To Patient And Get OTP Function should be run successfully", async function () {
        await HealthCareSystemIns.connect(acc4).requestAccessToPatient(1234);
        await HealthCareSystemIns.connect(acc1).requestAccessToPatient(1234);
        const OTP1 = await HealthCareSystemIns.connect(acc4).getOtp(1234);
        const OTP = await HealthCareSystemIns.connect(acc1).getOtp(1234);
        expect(await HealthCareSystemIns.Otp(1234)).to.equal(OTP);
      });
      it("Treatment details should be add successfully", async function () {
        await HealthCareSystemIns.connect(acc1).TreatPatient(
          1234,
          112,
          "Cough and Cold",
          "Chest X-ray",
          3600,
          "Rabil-DSR",
          "Don't Eat oily food"
        );
        await HealthCareSystemIns.connect(acc1).requestAccessToPatient(1234);
        const OTP = await HealthCareSystemIns.connect(acc1).getOtp(1234);
        const TreatmentId = await HealthCareSystemIns.connect(
          acc1
        ).getDetailsOfAllTID(1234, OTP);
        const TreatmentDetails = await HealthCareSystemIns.connect(
          acc1
        ).getTreatmentDetails(TreatmentId[0]);
        expect(TreatmentDetails[2]).to.equal("Cough and Cold");
      });

      it("Treatment details should be add successfully", async function () {
        await HealthCareSystemIns.connect(acc1).TreatPatient(
          1234,
          112,
          "Cough and Cold",
          "Chest X-ray",
          3600,
          "Rabil-DSR",
          "Don't Eat oily food"
        );
        await HealthCareSystemIns.connect(acc1).requestAccessToPatient(1234);
        const OTP = await HealthCareSystemIns.connect(acc1).getOtp(1234);
        const TreatmentId = await HealthCareSystemIns.connect(
          acc1
        ).getDetailsOfAllTID(1234, OTP);
        const TreatmentDetails = await HealthCareSystemIns.connect(
          acc1
        ).getTreatmentDetails(TreatmentId[0]);
        expect(TreatmentDetails[2]).to.equal("Cough and Cold");
      });
      it("Retrun Error if Caller is not Doctor", async function () {
        await expect(
          HealthCareSystemIns.connect(acc2).TreatPatient(
            1234,
            112,
            "Cough and Cold",
            "Chest X-ray",
            3600,
            "Rabil-DSR",
            "Don't Eat oily food"
          )
        ).to.be.revertedWith("Caller is not registered Doctor");
      });

      it("Retrun Error if Patient Id is not registered", async function () {
        await expect(
          HealthCareSystemIns.connect(acc1).TreatPatient(
            134,
            112,
            "Cough and Cold",
            "Chest X-ray",
            3600,
            "Rabil-DSR",
            "Don't Eat oily food"
          )
        ).to.be.revertedWith("PatientId is not registered");
      });
      it("Retrun Error if Caller should be Doctor/Patient And Aadhar Card number should be registered (requestAccessToPatient)", async function () {
        await expect(
          HealthCareSystemIns.connect(acc3).requestAccessToPatient(1234)
        ).to.be.revertedWith(
          "Caller should be Doctor/Patient And Aadhar Card number should be registered"
        );
      });
      it("Retrun Error if Caller should be Doctor/Patient And Aadhar Card number should be registered(getOtp)", async function () {
        await expect(
          HealthCareSystemIns.connect(acc3).getOtp(1235)
        ).to.be.revertedWith(
          "Caller should be Doctor/Patient And Aadhar Card number should be registered"
        );
      });
      it("Retrun Error if Caller should be Doctor/Patient (getDetailsOfAllTID)", async function () {
        await expect(
          HealthCareSystemIns.connect(acc3).getDetailsOfAllTID(1235, 32443)
        ).to.be.revertedWith("Caller should be Doctor/Patient");
      });
      it("Retrun Error if Incorrect OTP", async function () {
        await expect(
          HealthCareSystemIns.connect(acc4).getDetailsOfAllTID(1234, 4244)
        ).to.be.revertedWith("Incorrect OTP");
      });

      it("Update precautions in patient info correctly", async function () {
        await HealthCareSystemIns.connect(acc1).UpdatePrecautions(
          1234,
          "Don't eat fast food"
        );
        const abs = await HealthCareSystemIns.getPatientInfo(1234);
        expect(abs[6]).to.equal("Don't eat fast food");
      });

      it("Retrun Error if Patient Id is not registered", async function () {
        await expect(
          HealthCareSystemIns.connect(acc3).UpdatePrecautions(
            1234,
            "Don't eat fast food"
          )
        ).to.be.revertedWith("Caller is not registered doctor");
      });

      it("Add insurance keep should be add successfully", async function () {
        const abs = await HealthCareSystemIns.connect(acc1).addInsuranceKeep(
          1234,
          "Rabil-DSR"
        );
        await HealthCareSystemIns.connect(acc1).requestAccessToPatient(1234);
        const OTP = await HealthCareSystemIns.connect(acc1).getOtp(1234);
        const TreatmentId = await HealthCareSystemIns.connect(
          acc1
        ).getDetailsOfAllTID(1234, OTP);
        const detailsOfInsurance = await HealthCareSystemIns.connect(
          acc1
        ).getTreatmentDetails(TreatmentId[1]);
        expect(detailsOfInsurance.InsuranceKeep[0]).to.equal("Rabil-DSR");
      });
      it("Retrun Error if Caller is not registered user", async function () {
        await expect(
          HealthCareSystemIns.connect(acc3).addInsuranceKeep(1234, "Rabil-DSR")
        ).to.be.revertedWith("Caller is not registered user");
      });
      it("Retrun Error if Medicines should be match for clamming insurance", async function () {
        await expect(
          HealthCareSystemIns.connect(acc4).addInsuranceKeep(1234, "Rabil-PSR")
        ).to.be.revertedWith(
          "Medicines should be match for clamming insurance"
        );
      });

      it("Give medicines function should run successfully", async function () {
        const givenMedicines = await HealthCareSystemIns.givenMedicines(1234);
        expect(givenMedicines).to.equal("Rabil-DSR");
      });

      it("Get denote entitie info correctly", async function () {
        const entitie = await HealthCareSystemIns.getEntitie();
        const abs = await HealthCareSystemIns.connect(acc4).verify(1234);
        expect(abs).to.equal(1);
        const abs1 = await HealthCareSystemIns.connect(acc1).verify(112);
        expect(abs1).to.equal(2);
        const abs2 = await HealthCareSystemIns.connect(acc3).verify(142);
        expect(abs2).to.equal(3);
        const abs3 = await HealthCareSystemIns.connect(acc2).verify(124);
        expect(abs3).to.equal(4);
      });
      it("Get patient info correctly", async function () {
        const abs = await HealthCareSystemIns.getPatientInfo(1234);
        expect(abs[0]).to.equal("I'm patientName");
      });
    });
    describe("Value base testing", async function (){
      it("Get patient info correctly", async function () {
        const abs = await HealthCareSystemIns.getPatientInfo(1234);
        expect(abs[0]).to.equal("I'm patientName");
      });
    })
  });
});
