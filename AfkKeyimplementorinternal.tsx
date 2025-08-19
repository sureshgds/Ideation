import * as React from 'react';
import type { IAfkKeyimplementorinternalProps } from './IAfkKeyimplementorinternalProps';

import {
  DatePicker,
  DefaultButton,
  Dialog,
  DialogFooter,
  IDropdownOption,
  Dropdown,
  DialogType,
  TextField,
  IDatePickerStyles
} from '@fluentui/react';
import { IAfkKeyimplementorinternalStates } from './IAfkKeyimplementorinternalStates';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
import Backarrow from "./../assets/img/svg/back-arrow.png";
import { Web } from 'sp-pnp-js';
import * as CryptoJS from 'crypto-js';
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';

const dpStyles: IDatePickerStyles = {
  icon: {
    PointerEvent: 'none',
  },
  root: { /* styles */ },
  textField: { /* styles */ },
  callout:
    { /* styles */ }
};

export default class AfkKeyimplementorinternal extends React.Component<IAfkKeyimplementorinternalProps, IAfkKeyimplementorinternalStates, {}> {
  private IdeationServices: IdeationAPIServices;
  public token = "";
  public ideaID: any;
  public minRewardAmountLength: any = 0;
  startDateString: string;
  endDateString: string;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkKeyimplementorinternalProps, state: IAfkKeyimplementorinternalStates) {
    super(props);
    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.ideaID = params.get('ideaID');

    this.IdeationServices = new IdeationAPIServices();

    this.state = {
      ideaTitle: "",
      ideaMessage: "",
      ideaNumberstoMerge: '',
      implementationGroup: '',
      startDate: '',
      endDate: '',
      budget: '',
      selectedStatusKey: '',
      selectedStatusText: '',
      showInprogressOption: false,
      implementationContributorsList: [],
      managerselected: [],
      managerselected1: [],
      selectedImplementationStatusKey: '',
      selectedImplementationStatusText: '',
      timeNeedToWaitForExecution: '',
      extendTheWaitingPeriodForExecution: '',
      isRejectedHide: false,
      submitterEmailID: "",
      submitterUserName: "",
      isSuccess: false,
      errors: {},
      isLoader: true,
      isDialogVisible: false,
      isSuccessDialogVisible: false,
      errorDesciption: "",
      errorTitle: "",
      successMessageDesciption: "",
      englishContent: "",
      arabicContent: "",
      RewardAmount: 'AED',
      successMessageTitle: "",
      showBudegetIsAvailable: false,
      minDate: new Date(),
      endDateWithOutFormat: null,
      startDateWithOutFormat: null,
      isEndDateValid: true,
      sK0y: "",
      isHMAC: "",
      Max: "",
      numbers: "",
      token: "",
      videoURL: "",
      videoType: "",
      isCampaign: false,
      campaignID: 0,
      lang: "en",
      class: "afkforms-en",
      modalClass: "modal fade",
      errorMessage: "",
      hasBeen: "",
      byYOu: "",
      successfully: "",
      successMessage: "",
      unableTo: "",
      tryAgainlater: "",
      warningMessage: "",
      youHavealready: "",
      recordedVideo: "",
      thisidea: ""
    }
  }


  public async componentDidMount() {
    if (this.ideaID != null) {
      await this.getHMACENABLEorDISABLE();
      await this.getToken();
      // this.getIdeaApproval();
      // this.getMyIdea();
      // this.GetEmployeeDetails();
      // this.loadVideos();
      this.changeLanguage();
      this.fetchJsonFile('ar.json');
      this.fetchJsonFile('en.json');
    }
  }
  public async getToken() {

    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
    const listItems: any = await web.lists.getByTitle("TokenDispenser")
      .items
      .get();
    let tokenInfo = [];
    tokenInfo = listItems;
    if (tokenInfo.length > 0) {
      this.setState({
        token: tokenInfo[0].Token
      });

      console.log("Token - ", tokenInfo[0].Token);
    }
  }
  public async getHMACENABLEorDISABLE() {
    try {
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation");
      const listItems: any = await web.lists.getByTitle("HMACConfigList")
        .items
        .get();

      if (listItems.length > 0) {
        this.setState({
          sK0y: listItems[0].Key,
          isHMAC: listItems[0].IsHMAC
        });

      }
    } catch (error: any) {
      console.log('Error loading document URL:', error);
    }
  };
  generateHMAC(message: any, sKey: any) {
    return CryptoJS.HmacSHA256(message, sKey).toString(CryptoJS.enc.Base64);
  }
  public async GetEmployeeDetails() {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    // try {
    let apiResponse: any;
    let responseData: any = [];

    // let params =
    // {
    //   employeenumber: ideaOwner,
    //    division: "",
    //   usertype: ""
    // }

    let params =
    {
      employeenumber: "",
      division: "10003806",
      usertype: "MANG",
      taskforce: ""
    }

    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }
    // apiResponse = await this.IdeationServices.postDataEmployeeDEtails(params, headers, "employeedetails");
    // responseData = apiResponse.data.empdetails;
    // console.log("employeedetails", responseData);

    // this.setState({
    //   submitterEmailID: responseData.emailid,
    //   submitterUserName: responseData.name,
    // });
    // console.log(this.state.submitterEmailID, this.state.submitterUserName);
    // }
    // catch (ex) {
    //   this.errorLog(ex, "employeedetails", "getEmployeeDetails", "afk-appealapproval");
    // }


    apiResponse = await this.IdeationServices.postDataEmployeeDEtails(params, headers, "employeedetails");
    responseData = apiResponse.data.userlist;
    console.log("employeedetails", responseData);
    //let text = [];
    if (this.state.lang == 'en') {
      const employeeManager = responseData.map((employee: any) => ({
        key: employee.pernernumber.toString(),
        text: '\u200B',//employee.employeename + " " + employee.employeedesignation,
        data: {
          name: employee.employeename,
          designation: employee.employeedesignation,
        },
      }));

      this.setState({ implementationContributorsList: employeeManager });
    } else {
      const employeeManager = responseData.map((employee: any) => ({
        key: employee.pernernumber.toString(),
        text: '\u200B',//employee.employeename + " " + employee.employeedesignation,
        data: {
          name: employee.employeenameArabic,
          designation: employee.employeedesignationArabic,
        },
      }));

      this.setState({ implementationContributorsList: employeeManager });

    }

  }
  public async loadVideosForIdea() {
    try {
      // Fetch items from a specific document library
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
      const items = await web.lists.getByTitle("IdeaAudioVideo")
        .items
        .filter(`IdeaID eq '${this.ideaID}'`)
        .select("FileRef", "File_x0020_Type")
        .get();
      if (items.length > 0) {

        const videoType = this.getVideoType(items[0].File_x0020_Type);
        console.log("videoType", videoType);
        if (videoType != '') {
          this.setState({
            videoURL: "https://dewa.sharepoint.com" + items[0].FileRef,
            videoType: videoType
          });
        }
      }
      console.log("Video list", items);
      console.log("Video list", items[0].FileRef);
    } catch (error) {
      console.error("Error fetching video items: ", error);
    }
  }

  public async loadVideosForSolu() {
    try {
      // Fetch items from a specific document library
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
      const items = await web.lists.getByTitle("CampaignSolutionAudioVideo")
        .items
        .filter(`CampaignSolutionID eq '${this.ideaID}'`)
        .select("FileRef", "File_x0020_Type")
        .get();
      if (items.length > 0) {

        const videoType = this.getVideoType(items[0].File_x0020_Type);
        console.log("videoType", videoType);
        if (videoType != '') {
          this.setState({
            videoURL: "https://dewa.sharepoint.com" + items[0].FileRef,
            videoType: videoType
          });
        }
      }
      console.log("Video list", items);
      console.log("Video list", items[0].FileRef);
    } catch (error) {
      console.error("Error fetching video items: ", error);
    }
  }

  getVideoType(fileExtension: string): string {
    switch (fileExtension.toLowerCase()) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return '';
    }
  }
  public redirectIdeaDetails = () => {
    window.open("https://dewa.sharepoint.com.mcas.ms/sites/qaideation/SitePages/IdeaInnerPage.aspx?ideaID=" + this.ideaID, '_blank');
  };
  public createVideoFilesListItems() {
    let rows = [];
    if (this.state.videoURL) {
      rows.push(
        <div className="col-lg-4 mt-4">
          <div className="fu-attachement cursor-pointer" data-bs-toggle="modal"
            data-bs-target="#videoPreview">
            <i className="fa fa-play-circle fa-lg d-inline px-2"></i>
            <p className="fu-filename d-inline px-2">{this.state.recordedVideo}</p>
            {/* <span className="d-inline me-2">
              <i className="fa fa-eye d-inline px-3" data-bs-toggle="modal"
                        data-bs-target="#videoPreview"></i>

              </span> */}
          </div>
        </div>
      );

    } else {
      rows = [];
    }
    return rows;
  }

  public async getMyIdea() {
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      UserId: user.prno,// user.userName,
      ideaid: this.ideaID,
      action: "GETIDEABYID"
    }
    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`,
          'x-jwt-token': jtvparse.Jtv
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }

    apiResponse = await this.IdeationServices.getData(params, headers, "myideas");
    responseData = apiResponse.data;
    console.log("getMyIdea", responseData);
    if (responseData.data[0].campaignid == "" || responseData.data[0].campaignid == "0") {

      this.setState({
        isCampaign: false,
        isLoader: false,
        ideaTitle: responseData.data[0].ideatitle,
        ideaMessage: responseData.data[0].ideadescr,
        // submitterEmailID: responseData.data[0].submitteremailid,
        // submitterUserName: responseData.data[0].submittername,
      });
      this.loadVideosForIdea();
    }
    else {
      this.getCampaign(responseData.data[0].campaignid);
      this.setState({
        campaignID: responseData.data[0].campaignid,
        isCampaign: true,
        isLoader: false,
        ideaMessage: responseData.data[0].ideadescr,
        // submitterEmailID: responseData.data[0].submitteremailid,
        // submitterUserName: responseData.data[0].submittername,
      })
      this.loadVideosForSolu();
    }
    this.getEmployeeDetails(responseData.data[0].enteredby);
  }
  public async getEmployeeDetails(ideaOwner: any) {
    //try {
    let apiResponse: any;
    let responseData: any = [];

    let params =
    {
      employeenumber: ideaOwner,
      division: "",
      usertype: ""
    }

    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }
    apiResponse = await this.IdeationServices.postDataEmployeeDEtails(params, headers, "employeedetails");
    responseData = apiResponse.data.empdetails[0];
    console.log("employeedetails", responseData);

    this.setState({
      submitterEmailID: responseData.emailid,
      submitterUserName: responseData.name,
    });
    console.log(this.state.submitterEmailID, this.state.submitterUserName);
    //this.getIdeaMergeDetails();
    // }
    // catch (ex) {
    //   this.errorLog(ex, "employeedetails", "getEmployeeDetails", "ebt-latestchallenges");
    // }
  }

  public async getCampaign(campaignid: any) {
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      UserId: user.prno,//user.userName,
      CAMPAIGNID: campaignid,
      SEARCHTYPE: "CAMPAIGNID",
      languagecode: this.langCode
    }
    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`,
          'x-jwt-token': jtvparse.Jtv
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }
    apiResponse = await this.IdeationServices.getData(params, headers, "getCampaign");
    responseData = apiResponse.data;

    console.log("getCampaign", responseData);

    this.setState({
      ideaTitle: responseData.data[0].title,
    })

  }

  public async getIdeaApproval() {
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      ideaid: this.ideaID,
      userID: user.prno,//user.userName,
      action: "",
      languagecode: this.langCode
    }
    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`,
          'x-jwt-token': jtvparse.Jtv
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }

    apiResponse = await this.IdeationServices.getData(params, headers, "getIdeaApproval");
    responseData = apiResponse.data;
    console.log("getIdeaApproval", responseData);
    let dataList = [];
    dataList = responseData.data.filter((a: any) => a.approverrole == "Keyimeplementorinternal");
    let approvedStatus: any = '';
    // let rejectStatus:any;
    // let rejectStatus1:any;
    if (this.state.lang == 'en') {
      approvedStatus = 'Approved';
      // rejectStatus = 'Needmoreinfo';
      // rejectStatus1 = 'Notrelated'
    }
    else {
      approvedStatus = 'تمت الموافقة';
      // rejectStatus = 'حاجةالمزيدالمعلومات';
      // rejectStatus1 = 'غير مرتبط'
    }
    if (dataList.length > 0) {
      if (dataList[0].approvalstatus == 'Approved') {
        this.setState({
          isLoader: false,
          isSuccess: true,
          errorTitle: this.state.warningMessage,
          errorDesciption: this.state.youHavealready + " " + approvedStatus + " " + this.state.thisidea,
        });
      }
      this.openErrorDialog();
    }

  }
  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    if (lang) {
      let parsedlang = JSON.parse(lang);
      if (parsedlang.lang && parsedlang.lang == "ar") {
        this.setState({
          class: "afkforms-ar", lang: "ar", errorMessage: 'رسالة خطأ', hasBeen: ' تم  ', byYOu: ' بواسطتك', successfully: 'بنجاح.', recordedVideo: 'فيديو مسجل', Max: 'الحد الأقصى', numbers: 'الأرقام ',
          successMessage: 'رسالة نجاح', unableTo: "غير قادرعلى", tryAgainlater: '. يرجى المحاولة مرة أخرى لاحقا.', warningMessage: "رسالة التحذير", youHavealready: 'لقد قمت بالفعل', thisidea: 'هذه الفكرة'
        });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        this.getMyIdea();
        // this.getIdeaApproval();
        this.GetEmployeeDetails();
        // this.getProcessListValues();
      }
      else {
        this.setState({
          class: "afkforms-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video', Max: 'Max', numbers: 'Numbers',
          successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
        });
        this.globalClass = "global-en"
        body.classList.add('global-en');
        this.langCode = 1033;
        this.getMyIdea();
        // this.getIdeaApproval();
        this.GetEmployeeDetails();
        // this.getProcessListValues();
      }
    } else {
      this.setState({
        class: "afkforms-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video', Max: 'Max', numbers: 'Numbers',
        successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getMyIdea();
      // this.getIdeaApproval();
      this.GetEmployeeDetails();
      // this.getProcessListValues();
    }

  }
  public async submitIdeaApproval(approvalStatus: any) {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    debugger;
    this.callPowerAutomate1();
    await this.getToken();
    this.setState({ isLoader: true });
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);

    let params = {

      ApprovalID: 0,
      ideaid: this.ideaID,
      approvalsequence: 0,
      approvalstatus: approvalStatus,
      approvername: user.prno,//user.userName,
      approverremarks: null,
      ideatype: null,
      costsaving: 0,
      roi: 0,
      relatedideas: null,
      financialimpact: 0,
      feasibility: null,
      impltype: null,
      implresources: null,
      implstartdate: this.startDateString,
      implenddate: this.endDateString,
      implbudget: this.state.budget == '' || this.state.budget == null || this.state.budget == undefined ? 0 : parseInt(this.state.budget),
      implexewaiting: null,
      implaftexewaiting: null,
      implextwaiting: null,
      implneedmoretime: null,
      approverrole: "Keyimeplementorinternal",
      userid: user.prno,//user.userName,
      Keyimeplementer: null,
      score: 0,
      budgetavailable: 0,
      status: "",
      implementationstatus: "",
      submitterscore: 0,
      implementerscore: 0,
      submitteremailid: user.prno,// user.userEmailID,
      submittername: user.prno,//user.userName,
      radicaltotalweightage: 0,
      sustainingtotalweightage: 0,
      incrementaltotalweightage: 0,
      campaignid: this.state.campaignID,
      outcomes: null,
      dewainnovationobjectives: null,
      innovationtypes: null,
      results: null,
      contributorpercentage: 0,
      contributor: null,//this.state.managerselected,
      costsavingtype: "",
      recurringamount: 0,
      approverrolegroup: "",
      isrevised: "0",
      sleepingperiod: "",
      languagecode: this.langCode
    }
    let apiResponse: any;
    let responseData: any;
    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`,
          'x-jwt-token': jtvparse.Jtv
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }

    try {
      apiResponse = await this.IdeationServices.postData(params, headers, "submitIdeaApproval");
      responseData = apiResponse.data;
      let approvedStatus: any = '';
      //let rejectStatus:any;
      // let rejectStatus1:any;
      if (this.state.lang == 'en') {
        approvedStatus = 'Approved';
        // rejectStatus = 'Needmoreinfo';
        // rejectStatus1 = 'Notrelated'
      }
      else {
        approvedStatus = 'تمت الموافقة';
        // rejectStatus = 'حاجةالمزيدالمعلومات';
        // rejectStatus1 = 'غير مرتبط'
      }
      if (responseData.data.respcode > 0) {
        this.keyImplementorStatusEntry();
        this.insertNotification(this.state.ideaTitle + this.state.hasBeen + approvalStatus + this.state.byYOu, approvalStatus, this.ideaID, this.state.submitterEmailID, "Keyimeplementorinternal");
        if (!this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "Keyimeplementorinternal", this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID);

        }
        if (this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "Keyimeplementorinternal", this.state.ideaMessage, this.state.submitterUserName, this.state.submitterEmailID);

        }
        this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus);
        if (approvalStatus == 'Implemented') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            successMessageDesciption: approvedStatus + " " + this.state.successfully,
            successMessageTitle: this.state.successMessage,
          });
        }
        this.openSuccessDialog();
        console.log(apiResponse);
      } else {
        if (approvalStatus == 'Implemented') {
          this.setState({
            isLoader: false,
            isSuccess: false,
            errorTitle: this.state.errorMessage,
            errorDesciption: this.state.unableTo + " " + approvedStatus + " " + this.state.tryAgainlater,
          });
        }
        this.openErrorDialog();
      }
    } catch (e) {
      this.setState({
        isLoader: false,
        isSuccess: false,
        errorTitle: this.state.errorMessage,
        errorDesciption: this.state.unableTo + " " + approvalStatus + " " + this.state.tryAgainlater,
      });
      this.openErrorDialog();
    }

  }

  private validateForm1 = (): boolean => {
    const errors: { [key: string]: string } = {};


    if (!this.state.budget) {
      errors.budget = 'Budget is required';
    }
    // else if (this.minRewardAmountLength < 3) {
    //   errors.Title = 'Title must be at least 3 words';
    // }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };
  public keyImplementorStatusEntry = async () => {
    //let web:any;
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let loggedInUserId = user.userEmailID;
    let loggedInUser = user.userName;
    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
    const listitem: any = await web.lists.getByTitle("IdeaCurrentStatus").items.add(
      {
        IdeaID: this.ideaID,
        IdeaTitle: this.state.ideaTitle,
        IdeaOwner: this.state.submitterUserName,
        EmailID: this.state.submitterEmailID,
        StartDate: this.startDateString,
        EndDate: this.endDateString,
        LoggedInUser: loggedInUser,
        LoggedInUserID: loggedInUserId,
        IsCampaign: this.state.isCampaign == true ? 1 : 0
      }).then((res: any) => {
        if (res) {
          console.log("Approval Entry", res);
        }

      });
    console.log(listitem);

  }
  public insertNotification = async (notificationTitle: any, status: any, ideaId: any, ideaOwner: any, pageAction: any) => {
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      userid: user.prno,//user.userName,
      notificationTitle: notificationTitle,
      status: status,
      useremailID: user.prno,//user.userEmailID,
      submitteremailid: user.prno,//user.userEmailID,
      submittername: user.prno,// user.userName,
      ideaid: ideaId,
      ideaowner: ideaOwner,
      pageaction: pageAction,
      action: "ADD",
      notificationid: 0,
      emailstatus: "",
      emaillink: "",
      emailtouserid: "",
      isread: 0,
      languagecode: this.langCode
    }
    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);
    let headers: any;
    if (this.state.isHMAC == "Enable") {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`,
          'x-jwt-token': jtvparse.Jtv
        }
      };
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
    }

    apiResponse = await this.IdeationServices.postData(params, headers, "insertafkarinotification");
    responseData = apiResponse.data;
    if (responseData.data.respcode > 0) {
      console.log("insert afkari notification Res", responseData.data);
    }

  }
  public approvalEntry = async (approvalStatus: any, approvalRole: any, ideaTitle: any, ideaOwner: any, emailID: any) => {
    //let web:any;
    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
    const listitem: any = await web.lists.getByTitle("CommonApprovalList").items.add(
      {
        IdeaID: this.ideaID,
        ApprovalRole: approvalRole,
        Status: approvalStatus,
        IdeaTitle: ideaTitle,
        IdeaOwner: ideaOwner,
        EmailID: emailID,
        IsCampaign: this.state.isCampaign,
        SolutionDescription: ideaTitle,
        EndDate: this.state.endDateWithOutFormat
      }).then((res: any) => {
        if (res) {
          console.log("Approval Entry", res);
        }

      });
    console.log(listitem);

  }
  public async getUrls(name: any) {
    const web: any = new Web("https://dewa.sharepoint.com/sites/qaebtikari/");
    const listItems: any = await web.lists.getByTitle("PowerAutomateFlowsList")
      .items
      .filter(`Title eq '${name}'`)
      .expand(`AttachmentFiles`)
      .get();
    console.log(listItems);
    let url = '';
    if (listItems.length > 0) {
      url = listItems[0].Flowurl;
    }
    return url;
  }
  public async callPowerAutomate1() {
    try {
      // Define your parameters
      // Construct the URL with parameters
      //       let url: any = '';
      //       let flow = await this.getUrls("DisruptiveInnovationManagerRevise");


      //       url = flow + `&challengeID=${challengeID}&challengeTitle=${this.state.Title}&challengeOwner=${this.state.submitterUserNameen}&emailID=${emailID}&challengeType=${this.state.challengeTypeen}&challengeTitlear=${this.state.titlear}&challengeTypear=${this.state.challengeTypear}&challengeOwnerar=${this.state.submitterUserNamear}`
      // console.log(url);
      //       let url: any = '';
      //       let flow = await this.getUrls("DisruptiveInnovationManagerRevise");


      //       url = flow + `&challengeID=${challengeID}&challengeTitle=${this.state.Title}&challengeOwner=${this.state.submitterUserNameen}&emailID=${emailID}&challengeType=${this.state.challengeTypeen}&challengeTitlear=${this.state.titlear}&challengeTypear=${this.state.challengeTypear}&challengeOwnerar=${this.state.submitterUserNamear}`
      // console.log(url);
      let url: any = "";
      let flow = await this.getUrls("TokenDispenser");
      url = flow


      //url = `https://prod-28.uaenorth.logic.azure.com:443/workflows/a8362e44e17b48a6ad7807e701828cf3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AUhDprOI0MPbGou8m3jNedVXaghikaeXJl4ejBiz3Wo`;

      // Make the GET request
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful
      if (resp.ok) {
        const result = await resp.json();
        alert("Successfully Flow triggered");
        console.log(result);
      } else {
        // Handle HTTP error status
        console.error(`Error: ${resp.status} - ${resp.statusText}`);
      }

    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
    }
  }
  public async callPowerAutomate(p_ideaID: any, p_ideaTitle: any, p_ideaOwner: any, p_emailID: any, approvalStatus: any) {
    try {
      let struser: any = localStorage.getItem("userinfo");
      let user = JSON.parse(struser);
      let loggedInUserId = user.userEmailID;
      let loggedInUser = user.userName;
      // Define your parameters
      const ideaID = p_ideaID;
      const ideaTitle = p_ideaTitle;
      const ideaOwner = p_ideaOwner;
      const emailID = p_emailID;
      const IsCampaign = this.state.isCampaign == true ? 1 : 0;
      console.log("");
      // Construct the URL with parameters
      //       let url: any = '';
      //       let flow = await this.getUrls("DisruptiveInnovationManagerRevise");


      //       url = flow + `&challengeID=${challengeID}&challengeTitle=${this.state.Title}&challengeOwner=${this.state.submitterUserNameen}&emailID=${emailID}&challengeType=${this.state.challengeTypeen}&challengeTitlear=${this.state.titlear}&challengeTypear=${this.state.challengeTypear}&challengeOwnerar=${this.state.submitterUserNamear}`
      // console.log(url);
      let url: any = '';
      if (approvalStatus == "Approved") {
        let flow = await this.getUrls("KeyimplementorInternalApprovedApprove");
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=27&groupName='Keyimeplementorinternal'&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
        // url = `https://prod-22.uaenorth.logic.azure.com:443/workflows/10e0dda4538a4345a3684f63a8bb93fa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eJgb-WXTGtSwm6QrYmPid0wlNx9CGWzorMEqMV24vZU&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=27&groupName='Keyimeplementorinternal'&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
      }


      // Make the GET request
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Check if the request was successful
      if (resp.ok) {
        const result = await resp.json();
        alert("Successfully Flow triggered");
        console.log(result);
      } else {
        // Handle HTTP error status
        console.error(`Error: ${resp.status} - ${resp.statusText}`);
      }
    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
    }
  }
  private openSuccessDialog = () => {
    this.setState({ isSuccessDialogVisible: true });
  };

  private closeSuccessDialog = () => {
    this.setState({ isSuccessDialogVisible: false });
    if (this.state.isSuccess) {

      this.redirectHome();

    }
  };

  private openErrorDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  private closeErrorDialog = () => {
    this.setState({ isDialogVisible: false });
    if (this.state.isSuccess) {
      this.redirectHome();
    }
  };

  public redirectHome = () => {
    window.location.replace("https://dewa.sharepoint.com/sites/qaideation");
  };
  public Submit = () => {
    // event.preventDefault();

    // Handle form submission (e.g., send data to SharePoint)
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'

    if (this.state.budget != "") {

      // this.flowtrigger()
      this.submitIdeaApproval("Implemented")

    } else {
      this.validateForm1();
    }
  }










  public onchangebudget(e: any, newValue: any) {
    const numericPart = newValue.replace(/\D/g, '');
    const length = numericPart.length;
    // const length = newValue.length;
    if (!isNaN(length) && length <= 10) {
      this.minRewardAmountLength = length;
      const formattedValue = this.formatNumberWithCommas(numericPart);
      const stringReward = 'AED ' + formattedValue.toString();
      console.log(formattedValue);
      console.log(stringReward)
      this.setState({
        RewardAmount: stringReward,
        budget: numericPart,
        errors: {
          ...this.state.errors,
          // RewardAmount: '',
          budget: numericPart > 0 ? '' : 'Budget must have range from 1 to 10 numbers.',
        }
      });
    }
  }

  private formatNumberWithCommas(value: string): string {
    const numberValue = parseFloat(value.replace(/,/g, ''));
    // Convert the string into a number and then format with commas
    // const numberValue = Number(value);

    if (!isNaN(numberValue)) {
      const roundedValue = Math.round(numberValue);
      return roundedValue.toLocaleString(); // This adds commas as thousand separators
    }

    return value; // Return the original value if it's not a valid number
  }
  handleStartDateChange = (date: any) => {
    try {
      //this.startDateString = date.toISOString();
      const dates = new Date(date); // March 18, 2024
      const utcDate = new Date(dates.getTime() - (dates.getTimezoneOffset() * 60000));
      const formattedDate = this.formatDate(utcDate);
      this.startDateString = formattedDate;
      console.log("isoString start", formattedDate);
      this.setState({ startDateWithOutFormat: date, startDate: date }, this.validateEndDate);
    }
    catch (e) {
      console.log("handleStartDateChange", e);
    }
  };
  handleEndDateChange = (date: any) => {
    const dates = new Date(date); // March 18, 2024
    const utcDate = new Date(dates.getTime() - (dates.getTimezoneOffset() * 60000));
    const formattedDate = this.formatDate(utcDate);
    this.endDateString = formattedDate;
    console.log("isoString end", formattedDate);
    this.setState({ endDateWithOutFormat: date, endDate: date }, this.validateEndDate);
  };
  validateEndDate = () => {
    try {
      const startDateWithOutFormat = this.state.startDateWithOutFormat;
      const endDateWithOutFormat = this.state.endDateWithOutFormat;
      if (startDateWithOutFormat && endDateWithOutFormat && startDateWithOutFormat >= endDateWithOutFormat) {
        this.setState({ isEndDateValid: false });
      } else {
        this.setState({ isEndDateValid: true });
      }
    }
    catch (e) {
      console.log("validateEndDate", e);
    }
  };
  formatDate(date: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Adding leading zeros if needed
    const paddedDay = day < 10 ? '0' + day : day;

    return `${paddedDay}/${month}/${year}`;
  }
  private onRenderOption = (option: IDropdownOption): JSX.Element => {
    const { name, designation } = option.data;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 'normal' }}>

        <small>{name}</small>
        <small>{designation}</small>
      </div>
    );
  };

  private onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxHeight: 'auto',
          overflow: 'visible',
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            style={{
              marginRight: '15px',
              marginBottom: '5px',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {option.data.name}
              </span>
              <span style={{ fontSize: '12px', color: '#666' }}>
                {option.data.designation}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  private onChangeEmployee = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    let eventid = (event.target as HTMLDivElement).id;

    if (option) {
      if (option.key != '' && option.key != null && option.key != undefined) {



        const newSelectedKeys = [...this.state.managerselected];
        const newSelectedEmployees = [...this.state.managerselected1];





        // DrpEmployee.DrpManagerDrpEvaluation/DrpFacilitator/selectedTargetSegmentationKey
        if (eventid.indexOf("DrpManager") >= 0) {
          //this.setState({ showContributorError: '' })
          // const opt = (this.state.managerselected1).length
          if (option.selected) {
            newSelectedKeys.push(option.key);
            newSelectedEmployees.push(option);

          } else {
            const indexToRemove = newSelectedKeys.indexOf(option.key);
            newSelectedKeys.splice(indexToRemove, 1);
            newSelectedEmployees.splice(indexToRemove, 1);
          }
          //               let Arr: any = [];
          // for (let i = 0; i < opt; i++) {
          //   opt[i].share = 0;
          //   Arr.push(opt[i])

          // }
          //this.backUpContriArr = newSelectedEmployees
          // this.setState({ contributorArray: Arr})

          this.setState({
            managerselected: newSelectedKeys,
            managerselected1: newSelectedEmployees,
            //contributorArray: newSelectedEmployees

          });


        }


      }
    }

  }
  fetchJsonFile = async (fileName: any) => {
    try {
      // Specify the file path in the document library
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");

      const filePath = "/sites/qaideation/SiteAssets/IdeationAssets/lang/" + fileName;

      const file = await web.getFileByServerRelativeUrl(filePath).getText();

      console.log(file);
      const data = JSON.parse(file);
      console.log('Document Library Items:', data);
      if (fileName == 'ar.json') {
        this.setState({ arabicContent: data })
      }
      else {
        this.setState({ englishContent: data })
      }
      console.log(this.state.arabicContent, this.state.englishContent)
      // Parse the JSON data

      // this.setState({ jsonData: data });
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  };

  public render(): React.ReactElement<IAfkKeyimplementorinternalProps> {
    //const langText = this.state.lang === "en" ? en : ar;
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;
    return (
      <div className="col-lg-12 afk-keyimplementorinternal">
        <div className={this.state.class}>
          <div className="row">
            <div className="col-lg-12 back-heading head-navlink">
              <a href='https://dewa.sharepoint.com/sites/qaideation'>
                <img
                  className="float-start"
                  src={Backarrow}
                  alt="backarrow-icon"
                  width="16"
                  height="16"
                />
                <h2 className="back-heading ms-3 float-start">
                  {langText.keyimplementorinternal}
                </h2>
              </a>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              {!this.state.isCampaign && (
                <h2 className="h-lh-heading02">{langText.ideatitle}</h2>
              )}
              {this.state.isCampaign && (
                <h2 className="h-lh-heading02">{langText.campagintitle}</h2>
              )}
              <h3 className="h-idea-heading">
                {this.state.ideaTitle}
              </h3>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              {!this.state.isCampaign && (
                <h2 className="h-lh-heading02">{langText.ideadescription}</h2>
              )}
              {this.state.isCampaign && (
                <h2 className="h-lh-heading02">{langText.solutiondescription}</h2>
              )}
              <h3 className="h-idea-heading">
                {this.state.ideaMessage}
              </h3>
            </div>
          </div>

          <div>
            {/* <div className="row mt-4">
            <div className="col-lg-12">
              <div className="col-lg-12 p-0">
                <div className="col-lg-12">
                  <div className="form-floating">
                    <TextField
                      className="form-control"
                      label="Idea numbers to merge"
                      type='number'
                      value={this.state.ideaNumberstoMerge}
                      onChange={(e, newValue) => this.setState({ ideaNumberstoMerge: newValue || '' })}
                    />

                  </div>
                </div>

              </div>
            </div>
          </div>*/}


            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="col-lg-12 p-0">
                  <div className="col-lg-12">
                    <div className="form-floating">
                      <Dropdown
                        //className="form-select01 label-Contributors"
                        className="form-select01 label-Implementation-group error-star"
                        //label={langText.implementationgroup}
                        placeholder={langText.select}
                        multiSelect

                        id="DrpManager"
                        aria-label="Floating label select example"

                        options={this.state.implementationContributorsList}
                        disabled={false}
                        //  styles={dropdownStyles}
                        styles={{
                          root: {
                            width: '100%',
                          },
                          title: {
                            minHeight: '40px',
                            height: 'auto',
                            maxHeight: 'none',
                            whiteSpace: 'normal',
                            padding: '8px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                          },
                        }}
                        onChange={this.onChangeEmployee}
                        onRenderOption={this.onRenderOption}
                        onRenderTitle={this.onRenderTitle}
                        //onFocus={() => this.handleFocus('innovationEnablers')}

                        selectedKeys={this.state.managerselected}
                      //errorMessage={this.state.errors.selectedEmployeeKey}

                      />

                      {/* <label>Implementation group</label> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-6">


                <div className="form-floating">
                  <DatePicker
                    className="label-startdate"
                    // styles={{
                    //           icon: {
                    //           PointerEvent: 'none',
                    //           }}
                    styles={dpStyles}
                    value={this.state.startDate}
                    onSelectDate={this.handleStartDateChange}
                    placeholder={langText.startdate}
                    label={langText.startdatelable}
                    ariaLabel="Start date"
                    minDate={this.state.minDate}
                  // DatePicker uses English strings by default. For localized apps, you must override this prop.

                  />
                  {/* <TextField
                    className="form-control"
                    value={this.state.startDate}
                    onChange={(e, newValue) => this.setState({ startDate: newValue || '' })}
                  />
                  <label>Start Date</label> */}
                </div>



              </div>

              <div className="col-lg-6">


                <div className="form-floating">
                  <DatePicker
                    className="label-enddate"
                    // styles={{
                    //           icon: {
                    //           pointerEvents: 'none',
                    //           }}
                    styles={dpStyles}

                    value={this.state.endDate}
                    onSelectDate={this.handleEndDateChange}
                    placeholder={langText.enddate}
                    label={langText.enddatelable}
                    ariaLabel="End date"
                    minDate={this.state.minDate}

                  />

                </div>
                {!this.state.isEndDateValid && <span className="text-danger">{langText.enddateafterstartdate}</span>}



              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="col-lg-12 p-0">
                  <div className="col-lg-12">
                    <div className="form-floating">
                      {/* <TextField
                        className="form-control"
                        type='number'
                        label={langText.budget}
                        value={this.state.budget}
                        onChange={(e, newValue) => this.setState({ budget: newValue || '' })}
                      /> */}
                      <TextField
                        // type="number"
                        label={langText.budget}
                        placeholder={langText.enterrewardamount}
                        description={`${this.state.Max} ${this.minRewardAmountLength}/10 ${this.state.numbers}.`}
                        className="form-control"
                        value={this.state.RewardAmount}
                        onChange={(e, newValue) =>
                          this.onchangebudget(e, newValue)
                        }

                        errorMessage={this.state.errors.budget}
                      />
                      {/* <label>Budget</label> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {this.createVideoFilesListItems()}
          </div>

          <div className='row mt-4'>
            <div className='col-lg-12'>
              <p className="vcs-text float-start mb-0 cursor-pointer"><a onClick={() => this.redirectIdeaDetails()}>{langText.clickhere}</a></p>
            </div>
          </div>

          <div
            className="modal fade"
            id="videoPreview"
            aria-labelledby="videoPreviewLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="videoPreviewLabel">
                    {langText.recordedvideo}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"

                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">

                    {this.state.videoURL && (
                      <div className="col-lg-12 text-center mt-3">
                        <h4 className="h-sub01">{langText.playyourrecordingbelow}</h4>
                        <video
                          className="mt-3"
                          src={this.state.videoURL}
                          controls
                        />
                        {/* <button onClick={this.uploadVideoBlob}>Upload</button>
              <button onClick={this.downloadVideo}>Download Recorded Video</button> */}

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              {/* <div className='float-start'>
                <div className="float-start">
                  <a href="https://dewa.sharepoint.com.mcas.ms/sites/qaideation" type="button" className="btn btn-secondary p-btn">
                    {langText.cancel}
                  </a>
                </div>
              </div> */}
              <div className="float-end">
                <div className="float-start">
                  <button onClick={() => this.Submit()} className="btn-navlink btn btn-primary p-btn">
                    {langText.complete}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            hidden={!this.state.isSuccessDialogVisible}
            onDismiss={this.closeSuccessDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: `${this.state.successMessageTitle}`,
              subText: `${this.state.successMessageDesciption}`,
              className: "ebtdialogsuccess",
            }}
          >
            <img
              src={MIe01}
              className="mis-icon ebtdialogicon"
              alt="edit-icon"
              width="48"
              height="48"
            />
            <DialogFooter>
              <DefaultButton onClick={this.closeSuccessDialog} text={langText.close} />
            </DialogFooter>
          </Dialog>

          <Dialog
            hidden={!this.state.isDialogVisible}
            onDismiss={this.closeErrorDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: `${this.state.errorTitle}`,
              subText: `${this.state.errorDesciption}`,
              className: "ebtdialogerror",
            }}
          >
            <img
              src={MIe02}
              className="mins-icon ebtdialogicon"
              alt="edit-icon"
              width="48"
              height="48"
            />
            <DialogFooter>
              <DefaultButton onClick={this.closeErrorDialog} text={langText.close} />
            </DialogFooter>
          </Dialog>

        </div>

        {/* loader section */}
        <div className="row m-0">
          {this.state.isLoader && (
            <div className="col-lg-12 p-0">
              <div className="lds-ring-backdrop">
                <div className="lds-ring-container">
                  <div className="ebtloader"></div>
                  <div className="text-center lds-text">{langText.loading}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* loader section */}
      </div>
    );
  }
}
