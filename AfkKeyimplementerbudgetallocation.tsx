import * as React from 'react';
// import styles from './AfkKeyimplementerbudgetallocation.module.scss';
import { IAfkKeyimplementerbudgetallocationProps } from './IAfkKeyimplementerbudgetallocationProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { IAfkKeyimplementerbudgetallocationStates } from './IAfkKeyimplementerbudgetallocationStates';
import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");

import Backarrow from "./../assets/img/svg/back-arrow.png";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";


import { DefaultButton, Dialog, DialogFooter, DialogType, TextField } from '@fluentui/react';
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
import { Web } from 'sp-pnp-js';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
import * as CryptoJS from 'crypto-js';
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
// const radiooptions01: IChoiceGroupOption[] = [
//   { key: "A", text: "Yes" },
//   { key: "B", text: "No" },
// ];
const choiceGroupStyles = {
  label: {
    display: "inline",
  },
  flexContainer: {
    columnGap: "1em",
    display: "inline-flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
};
export default class AfkKeyimplementerbudgetallocation extends React.Component<IAfkKeyimplementerbudgetallocationProps, IAfkKeyimplementerbudgetallocationStates, {}> {
  private IdeationServices:
    IdeationAPIServices;
  public ideaID: any;
  ideaWithFrom: any;
  isFrom: any;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkKeyimplementerbudgetallocationProps, state: IAfkKeyimplementerbudgetallocationStates) {
    super(props);
    this.IdeationServices = new IdeationAPIServices();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    //this.ideaID = params.get('ideaID');
    this.ideaWithFrom = params.get("ideaID");
    if (this.ideaWithFrom != null) {
      let paramArr: any = [];
      paramArr = this.ideaWithFrom!.split('_')
      this.ideaID = paramArr[0];
      this.isFrom = paramArr[1];
    }
    this.state = {
      yesorno: false,
      ideaTitle: "",
      submitterEmailID: "",
      submitterUserName: "",
      enteredOndate: "",
      isSuccess: false,
      isLoader: false,
      errorDesciption: "",
      errorTitle: "",
      isDialogVisible: false,
      errors: {},
      isSuccessDialogVisible: false,
      successMessageDesciption: "",
      successMessageTitle: "",
      ifTheBudgetIsAvailableList: [],
      selectedIfTheBudgetIsAvailableKey: "",
      selectedIfTheBudgetIsAvailableText: "",
      option: [
        // { key: "Yes", text: "Yes" },
        // { key: "No", text: "No" },
      ],
      budget: "",
      rejectedreason: "",
      isCommentRequired: false,
      reason: "",
      show: "",
      sK0y: "",
      isHMAC: "",
      token: "",
      videoURL: "",
      videoType: "",
      isCampaign: false,
      campaignID: 0,
      ideaMessage: "",
      isRejectReasonVisible: false,
      rejectReasonComment: "",
      rejectReasonTitle: "",
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
      englishContent:"",
      arabicContent:"",
      thisidea: "",
    }

  }
  public onchange = (e: any, option: IChoiceGroupOption) => {
    console.log(option)
    this.setState({ selectedIfTheBudgetIsAvailableKey: option.key, selectedIfTheBudgetIsAvailableText: option.text })
    if (option.key == "Yes" || option.key == "نعم" ) {
      this.setState({ yesorno: true, show: option.key })
    }
    else {
      this.setState({ yesorno: false, show: option.key })


    }

  }

  public async componentDidMount() {
    if (this.ideaID != null) {
      await this.getHMACENABLEorDISABLE();
      await this.getToken();
      // this.getIdeaApproval();
      // this.getMyIdea();
      // this.getIFApproval();
      // this.loadVideos();
      this.changeLanguage();
      this.fetchJsonFile('ar.json');
      this.fetchJsonFile('en.json');
    }
    else {
      this.setState({ isLoader: true });
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
    this.getProcessListValues();
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

  public async getProcessListValues() {
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'

    let apiResponse: any;
    let responseData: any = [];
    let jtv:any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      processname: "GENERAL IDEA",
      LANGUAGECODE: this.langCode
    };
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
          'x-jwt-token':jtvparse.Jtv
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
      apiResponse = await this.IdeationServices.getData(params, headers, "getProcessListValues");
    } catch (e) {
      console.log("Exception", e);
    }
    responseData = apiResponse.data.data;
    let values = responseData;
    values = values.filter((x: any) => {
      return x.fieldname.toLowerCase() == "confirmation";
    });
    let option: any = [];
    values.map((a: any) => {
      let obj = { key: "", text: "" };
      obj.key = a.listvalue;
      obj.text = a.listvalue;
      option.push(obj);
    });
    this.setState({ option: option });

  }

  public async loadVideos() {
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

  // public componentDidMount() {
  //   if (this.ideaID != null) {
  //     this.getIdeaApproval();
  //     this.getMyIdea();
  //     this.getIFApproval();
  //   }
  // }

  public async getMyIdea() {
    debugger;

    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv:any = localStorage.getItem("Jtv");
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
          'x-jwt-token':jtvparse.Jtv
        }
      };
      console.log("headers", headers);
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
      console.log("headers", headers);
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
    let jtv:any = localStorage.getItem("Jtv");
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
          'x-jwt-token':jtvparse.Jtv
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

  public async getIFApproval() {
     this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    debugger;

    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv:any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      IDEAID: this.ideaID,
      userid: user.prno,// user.userName,
      processname: "IFIDEA",
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
          'x-jwt-token':jtvparse.Jtv
        }
      };
      console.log("headers", headers);
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
      console.log("headers", headers);
    }

    apiResponse = await this.IdeationServices.getData(params, headers, "getIFApproval");
    responseData = apiResponse.data;
    console.log("getIFApproval", responseData);
    let dataList = responseData.data.filter((a: any) => a.approverrole == "ifprocessfillandreviewactivity");
    if (dataList.length > 0) {
      this.setState({
        isLoader: false,
        reason: dataList[0].rejectedReason,

      });
    }
  }

  public async getIdeaApproval() {
    debugger;
  this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv:any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      ideaid: this.ideaID,
      userID: user.prno,// user.userName,
      action: "",
      languagecode:this.langCode
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
          'x-jwt-token':jtvparse.Jtv
        }
      };
      console.log("headers", headers);
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
      console.log("headers", headers);
    }

    apiResponse = await this.IdeationServices.getData(params, headers, "getIdeaApproval");
    responseData = apiResponse.data;
    console.log("getIdeaApproval", responseData);
    let dataList = [];
    dataList = responseData.data.filter((a: any) => a.approverrole == "Keyimeplementorbudgetallocation");
    let noOfTimes: any = 0;
    if (this.isFrom == "" || this.isFrom == undefined) {
      noOfTimes = 1;
    }
    else if (this.isFrom == "1stAppeal") {
      noOfTimes = 2;
    }
    else if (this.isFrom == "2ndAppeal") {
      noOfTimes = 3;
    }

    if (dataList.length >= noOfTimes) {
      //if (dataList.length > 1) {
      this.setState({
        isLoader: false,
        isSuccess: true,
        errorTitle: this.state.warningMessage,
        errorDesciption: this.state.youHavealready + " " + responseData.data[0].approvalstatus + " " + this.state.thisidea,
      });
      this.openErrorDialog();
    }

  }
  // public onchangebudjet = (e: any) => {
  // this.setState({budget:e.target.value});
  // }
  public onchangebudjet = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 10) {
      this.setState({ budget: onlyNums });
    } else if (onlyNums.length === 10) {
      const number = onlyNums.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '($1) $2-$3'
      );
      this.setState({ budget: number });
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
          class: "afkforms-ar", lang: "ar", errorMessage: 'رسالة خطأ', hasBeen: ' تم  ', byYOu: ' بواسطتك', successfully: 'بنجاح.', recordedVideo: 'فيديو مسجل',
          successMessage: 'رسالة نجاح', unableTo: "غير قادرعلى", tryAgainlater: '. يرجى المحاولة مرة أخرى لاحقا.', warningMessage: "رسالة التحذير", youHavealready: 'لقد قمت بالفعل', thisidea: 'هذه الفكرة'
        });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        this.getMyIdea();
        this.getIdeaApproval();
        this.getIFApproval();
        this.loadVideos();
        // this.GetEmployeeDetails();
        this.getProcessListValues();
      }
      else {
        this.setState({
          class: "afkforms-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video',
          successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
        });
        this.globalClass = "global-en"
        body.classList.add('global-en');
        this.langCode = 1033;
        this.getMyIdea();
        this.getIdeaApproval();
        this.getIFApproval();
        this.loadVideos();
        // this.GetEmployeeDetails();
        this.getProcessListValues();
      }
    } else {
      this.setState({
        class: "afkforms-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video',
        successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getMyIdea();
      this.getIdeaApproval();
      this.getIFApproval();
      this.loadVideos();
      // this.GetEmployeeDetails();
      this.getProcessListValues();
    }

  }

  public async submitIdeaApproval() {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    debugger;
    this.callPowerAutomate1();
    await this.getToken();
    this.setState({ isLoader: true });
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv:any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let approvalStatus = this.state.yesorno ? "Implemented" : "Rejected";
    let budget = this.state.budget === "" ? 0 : this.state.budget;

    let params = {

      ApprovalID: 0,
      ideaid: this.ideaID,
      approvalsequence: 0,
      approvalstatus: approvalStatus,
      approvername: user.prno,// user.userName,
      approverremarks: this.state.rejectedreason,
      ideatype: "",
      costsaving: 0,
      roi: 0,
      relatedideas: "",
      financialimpact: 0,
      feasibility: "",
      impltype: "",
      implresources: "",
      implstartdate: "",
      implenddate: "",
      implbudget: budget,
      implexewaiting: "",
      implaftexewaiting: "",
      implextwaiting: "",
      implneedmoretime: "",
      approverrole: "Keyimeplementorbudgetallocation",
      userid: user.prno,// user.userName,
      Keyimeplementer: "",
      score: 0,
      budgetavailable: 0,
      status: "",
      implementationstatus: "",
      submitterscore: 0,
      implementerscore: 0,
      submitteremailid: user.prno,// user.userEmailID,
      submittername: user.prno,// user.userName,
      radicaltotalweightage: 0,
      sustainingtotalweightage: 0,
      incrementaltotalweightage: 0,
      campaignid: this.state.campaignID,
      outcomes: "",
      dewainnovationobjectives: "",
      innovationtypes: "",
      results: "",
      contributorpercentage: 0,
      contributor: "",
      costsavingtype:"",
      recurringamount:0,
      approverrolegroup:"",
      isrevised:"0",
      sleepingperiod:"",
      languagecode:this.langCode
    }
    console.log("params", params);
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
          'x-jwt-token':jtvparse.Jtv
        }
      };
      console.log("headers", headers);
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
      console.log("headers", headers);
    }

    try {
      apiResponse = await this.IdeationServices.postData(params, headers, "submitIdeaApproval");
      responseData = apiResponse.data;
      if (responseData.data.respcode > 0) {
        // this.keyImplementorStatusEntry();
        this.insertNotification(this.state.ideaTitle +  this.state.hasBeen + approvalStatus + this.state.byYOu, approvalStatus, this.ideaID, this.state.submitterEmailID, "Keyimeplementorbudgetallocation");
        if (!this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "Keyimeplementorbudgetallocation", this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID);

        }
        if (this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "Keyimeplementorbudgetallocation", this.state.ideaMessage, this.state.submitterUserName, this.state.submitterEmailID);

        }
        //this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus);
        this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus, user.userName, user.userEmailID);
       if(approvalStatus=="Implemented"){this.setState({
          isLoader: false,
          isSuccess: true,
          successMessageDesciption: "Approved" + " " + this.state.successfully,
          successMessageTitle: this.state.successMessage,
        });
        this.openSuccessDialog();
        console.log(apiResponse);

       }else{
        this.setState({
          isLoader: false,
          isSuccess: true,
          successMessageDesciption: "Rejected" + " " + this.state.successfully,
          successMessageTitle: this.state.successMessage,
        });
        this.openSuccessDialog();
        console.log(apiResponse);
       }
        // this.setState({
        //   isLoader: false,
        //   isSuccess: true,
        //   successMessageDesciption: approvalStatus + " " + this.state.successfully,
        //   successMessageTitle: this.state.successMessage,
        // });
        // this.openSuccessDialog();
        // console.log(apiResponse);
      } else {
        this.setState({
          isLoader: false,
          isSuccess: false,
          errorTitle: this.state.errorMessage,
          errorDesciption: this.state.unableTo + " " + approvalStatus + " " + this.state.tryAgainlater,
        });
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
        SolutionDescription: ideaTitle
      }).then((res: any) => {
        if (res) {
          console.log("Approval Entry", res);
        }

      });
    console.log(listitem);

  }
  public async getUrls(name: any) {
    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
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
  public async callPowerAutomate(p_ideaID: any, p_ideaTitle: any, p_ideaOwner: any, p_emailID: any, approvalStatus: any
    , loggedInUser: any,
    loggedInUserId: any
  ) {
    try {
      // Define your parameters
      const ideaID = p_ideaID;
      const ideaTitle = p_ideaTitle;
      const ideaOwner = p_ideaOwner;
      const emailID = p_emailID;
      const IsCampaign = this.state.isCampaign == true ? 1 : 0;
      console.log("");
      // Construct the URL with parameters
      let url: any = '';
      //       let url: any = '';
      //       let flow = await this.getUrls("DisruptiveInnovationManagerRevise");


      //       url = flow + `&challengeID=${challengeID}&challengeTitle=${this.state.Title}&challengeOwner=${this.state.submitterUserNameen}&emailID=${emailID}&challengeType=${this.state.challengeTypeen}&challengeTitlear=${this.state.titlear}&challengeTypear=${this.state.challengeTypear}&challengeOwnerar=${this.state.submitterUserNamear}`
      // console.log(url);
      if (approvalStatus == "Approved") {
        let flow = await this.getUrls("keyImplementorAllocatedBudgetApprove");
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=92&groupName=Keyimplementorbudgetallocator&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
       // url = `https://prod-20.uaenorth.logic.azure.com:443/workflows/5d117cdf38624357b743b91436707dd3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=itcQ8Si84VXlHbeLFm40VAmI_g_WuHuYt1-ci6E90A4&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=92&groupName=Keyimplementorbudgetallocator&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
      }
      else if (approvalStatus == "Rejected") {
        let flow = await this.getUrls("KeyimplementorAllocatedBudgetReject");
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=92&groupName=Keyimplementorbudgetallocator&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&rejectReason=${this.state.rejectedreason}&IsCampaign=${IsCampaign}&IsFrom=keyimplementorBudgetAllocation`
        //url = `https://prod-00.uaenorth.logic.azure.com:443/workflows/6957a008636f43f8a88dc0cfdaf6c7b1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qr5wJ2nY29zyI1VBL9ZB-rK84940kCBAZ2kIs7N1doI&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=92&groupName=Keyimplementorbudgetallocator&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&rejectReason=${this.state.rejectedreason}&IsCampaign=${IsCampaign}&IsFrom=keyimplementorBudgetAllocation`
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
  };


  public redirectHome = () => {
    window.location.replace("https://dewa.sharepoint.com/sites/qaideation");
  };
  public insertNotification = async (notificationTitle: any, status: any, ideaId: any, ideaOwner: any, pageAction: any) => {
    debugger;
      this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let jtv:any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      userid: user.prno,// user.userName,
      notificationTitle: notificationTitle,
      status: status,
      useremailID: user.prno,// user.userEmailID,
      submitteremailid: user.prno,// user.userEmailID,
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
      languagecode:this.langCode
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
          'x-jwt-token':jtvparse.Jtv
        }
      };
      console.log("headers", headers);
    }
    else {
      headers = {
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      };
      console.log("headers", headers);
    }

    apiResponse = await this.IdeationServices.postData(params, headers, "insertafkarinotification");
    responseData = apiResponse.data;
    if (responseData.data.respcode > 0) {
      console.log("insert afkari notification Res", responseData.data);
    }

  }
  public onChangerejectedreason(e: any, selctedOptions: any) {

    this.setState({ rejectedreason: selctedOptions })

  }

  submitIdea() {
    this.state.yesorno ? "Implemented" : "Rejected";
    if (this.state.yesorno) {
      this.submitIdeaApproval();
    }
    else {
      this.openRejectReasonSuccessDialog();
    }
  }

  private openRejectReasonSuccessDialog = () => {
    this.setState({ rejectReasonTitle: "Reason for Rejection", isRejectReasonVisible: true });
  };

  private closeRejectReasonSuccessDialog = () => {
    this.setState({ isCommentRequired: false, isRejectReasonVisible: false });
  };


  public onChangeRejectReasonComment(e: any, selctedOptions: any) {

    this.setState({ rejectReasonComment: selctedOptions });
  }
  fetchJsonFile = async (fileName:any) => {
    try {
      // Specify the file path in the document library
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
   
      const filePath = "/sites/qaideation/SiteAssets/IdeationAssets/lang/"+fileName;
     
      const file = await web.getFileByServerRelativeUrl(filePath).getText();
     
      console.log(file);
      const data = JSON.parse(file);
      console.log('Document Library Items:',data);
      if(fileName == 'ar.json'){
        this.setState({arabicContent:data})
      }
      else{
        this.setState({englishContent:data})
      }
      console.log(this.state.arabicContent,this.state.englishContent)
      // Parse the JSON data
     
     // this.setState({ jsonData: data });
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  };
  public render(): React.ReactElement<IAfkKeyimplementerbudgetallocationProps> {
   // const langText = this.state.lang === "en" ? en : ar;
    const langText = this.state.lang === "en" ? this.state.englishContent:this.state.arabicContent;

    return (
      <div className="col-lg-12 afk-keyimplementerbudgetallocation">
        <div className={this.state.class}>
          <div className="row">
            <div className="col-lg-12 back-heading head-navlink">
              <a className="" href="https://dewa.sharepoint.com/sites/qaideation">
                <img
                  className="float-start"
                  src={Backarrow}
                  alt="backarrow-icon"
                  width="16"
                  height="16"
                />
                <h2 className="back-heading ms-3 float-start">
                  {" "}
                  {langText.allocatebudget} {" "}
                </h2>
              </a>
            </div>
          </div>

          {/* <div className="row mt-4">
          <div className="col-lg-6  mt-0 mb-4">
            <h2 className="main-heading02" style={{ fontSize: '1rem' }}>
              Check Fund Availability Manually.{" "}
            </h2>
          </div>
        </div> */}

          <div className='row mt-4'>
            <div className='col-lg-12'>
              <h2 className="h-lh-heading02">{langText.reviewtheidea}</h2>
              {/* <h3 className="h-idea-heading">{this.state.ideaTitle}</h3> */}
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
                {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. */}
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

              <h3 className="h-idea-heading"> {this.state.ideaMessage} </h3>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-lg-12'>
              <h2 className="h-lh-heading02">{langText.innovationrejectionreason}</h2>
              <h3 className="h-idea-heading">{this.state.reason}</h3>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              <h2 className="h-lh-heading02">{langText.decidedtomove} </h2>
            </div>
            <div className="col-lg-12">
              <ChoiceGroup
                // defaultSelectedKey="B"
                options={this.state.option}
                onChange={this.onchange}
                label=""
                required={true}
                styles={choiceGroupStyles}
              />
            </div>
          </div>

          {/* Conditionally render the rejection reason text field based on the value of yesorno */}
          {(this.state.show === "Yes" || this.state.show === "نعم" ) && (
            <div className="row mt-4">
              <div className="form-floating">
                <h4 className="h-sub01">{langText.allocatebudget1}</h4>
                <TextField
                  className="form-control h-100"
                  placeholder={langText.budgetallocate}
                  id="floatingTextarea2"
                  value={this.state.budget}
                  onChange={(e) => this.onchangebudjet(e)}
                  multiline
                  rows={5}
                  autoAdjustHeight
                />
                {/* {this.state.isCommentRequired && (
                <p className="text-danger">Enter a reason</p>
              )} */}
              </div>
            </div>
          )}

          <div className="row">
            {this.createVideoFilesListItems()}
          </div>

          <div className="row mt-4">
  <p className="vcs-text float-start mb-0 cursor-pointer"><a onClick={() => this.redirectIdeaDetails()}>{langText.clickhere}</a></p>
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
              <div className="float-end">
                <div className="float-start">



                  {/* <button className="btn-navlink btn btn-secondary p-btn" type="button" onClick={() => this.submitIFApproval('Rejected')}>
                  Cancel
                </button> */}
                </div>
                <div className="float-start">
                  <button onClick={() => this.submitIdea()} type="button" className="btn-navlink p-btn btn btn-primary">
                    <span> {langText.complete}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            hidden={!this.state.isRejectReasonVisible}
            onDismiss={this.closeRejectReasonSuccessDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: `${this.state.rejectReasonTitle}`,
              className: "ebtdialogsmall",
            }}
          >
            <div className="form-floating">
              <TextField className="form-control h-120"
                placeholder={langText.enterreasonforrejection}
                id="floatingTextarea2"
                value={this.state.rejectedreason}
                onChange={(e, newValue) => this.onChangerejectedreason(e, newValue)}
                multiline rows={5} autoAdjustHeight
              />
              {this.state.isCommentRequired && (
                <p className="text-danger">{langText.enterareason}</p>
              )}
            </div>
            <DialogFooter>
              <DefaultButton className="btn-clear" onClick={this.closeRejectReasonSuccessDialog} text={langText.close} />
              <DefaultButton className="btn-accept" onClick={() => this.submitIdeaApproval()} text={langText.ok} />
            </DialogFooter>
          </Dialog>

          <Dialog
            hidden={!this.state.isSuccessDialogVisible}
            onDismiss={this.closeSuccessDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: `${this.state.successMessageTitle}`,
              subText: `${this.state.successMessageDesciption}`,
              className: 'ebtdialogsuccess'
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
              className: 'ebtdialogerror'
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

          {/* loader section */}
          <div className="row m-0">
            {this.state.isLoader && (
              <div className="col-lg-12 p-0">
                <div className="lds-ring-backdrop">
                  <div className="lds-ring-container">
                    <div className='ebtloader'></div>
                    <div className="text-center lds-text">{langText.laoding}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* loader section */}

        </div>
      </div>
    );
  }
}
