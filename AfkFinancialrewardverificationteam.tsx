import * as React from 'react';

import type { IAfkFinancialrewardverificationteamProps } from './IAfkFinancialrewardverificationteamProps';
import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
import { IAfkFinancialrewardverificationteamStates } from './IAfkFinancialrewardverificationteamStates';
import Backarrow from "./../assets/img/svg/back-arrow.png";
import { Web } from 'sp-pnp-js';
import { DefaultButton, Dialog, DialogFooter, DialogType, TextField } from '@fluentui/react';
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
import * as CryptoJS from 'crypto-js';
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';
export default class AfkFinancialrewardverificationteam extends React.Component<IAfkFinancialrewardverificationteamProps, IAfkFinancialrewardverificationteamStates, {}> {

  private IdeationServices: IdeationAPIServices;
  public token = "";
  public ideaID: any;
  public userInfo: any;
  public minRewardAmountLength1: any = 0;
  globalClass = "global-en";
  langCode: any = 1033;

  constructor(props: IAfkFinancialrewardverificationteamProps, state: IAfkFinancialrewardverificationteamStates) {
    super(props);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.ideaID = params.get('ideaID');
    this.IdeationServices = new IdeationAPIServices();
    this.state = {
      ideaTitle: "",
      ideaMessage: "",
      submitterEmailID: "",
      submitterUserName: "",
      isSuccess: false,
      isLoader: true,
      isDialogVisible: false,
      isSuccessDialogVisible: false,
      errorDesciption: "",
      errorTitle: "",
      successMessageDesciption: "",
      successMessageTitle: "",
      approvalStatus: "",
      remarksComment: "",
      RewardAmount1:'AED',
      Max: '',
      numbers: '',
      sK0y: "",
      ROI:"",
      isHMAC: "",
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
      englishContent: "",
      arabicContent: "",
      thisidea: ""
    }
  }

  // Call Page Refersh
  public async componentDidMount(): Promise<void> {
    if (this.ideaID != null) {
      await this.getHMACENABLEorDISABLE();
      await this.getToken();
      //await this.getIdeaApproval();
      // this.getMyIdea();
      // this.loadVideos();
      this.changeLanguage();
      this.fetchJsonFile('ar.json');
      this.fetchJsonFile('en.json');
    }

  }

  fetchJsonFile = async (fileName: any) => {
    try {
      // Specify the file path in the document library
      const web: any = new Web("https://dewa.sharepoint.com/sites/ideation/");

      const filePath = "/sites/ideation/SiteAssets/IdeationAssets/lang/" + fileName;

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

  // Get Token In Share point list
  public async getToken() {

    const web: any = new Web("https://dewa.sharepoint.com/sites/ideation/");
    const listItems: any = await web.lists.getByTitle("TokenDispenser")
      .items
      .get();
    let tokenInfo = [];
    tokenInfo = listItems;
    if (tokenInfo.length > 0) {
      this.setState({
        token: tokenInfo[0].Token
      });

    }
  }

  // Get HMAC key In Share point list
  public async getHMACENABLEorDISABLE() {
    try {
      const web: any = new Web("https://dewa.sharepoint.com/sites/ideation");
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
    }
  };

  // Genrate HMAC Vlaue
  generateHMAC(message: any, sKey: any) {
    return CryptoJS.HmacSHA256(message, sKey).toString(CryptoJS.enc.Base64);
  }

  // Get Share point list videos
  public async loadVideosForIdea() {
    try {
      // Fetch items from a specific document library
      const web: any = new Web("https://dewa.sharepoint.com/sites/ideation/");
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
      const web: any = new Web("https://dewa.sharepoint.com/sites/ideation/");
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
  // Get Video Type return
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

  // Redierct Idea Deatails Page
  public redirectIdeaDetails = () => {
    window.open("https://dewa.sharepoint.com.mcas.ms/sites/ideation/SitePages/IdeaInnerPage.aspx?ideaID=" + this.ideaID, '_blank');
  };
  public createVideoFilesListItems() {
    let rows = [];
    if (this.state.videoURL) {
      rows.push(
        <div className="col-lg-4 mb-4">
          <div className="fu-attachement cursor-pointer" data-bs-toggle="modal"
            data-bs-target="#videoPreview">
            <i className="fa fa-play-circle fa-lg d-inline px-2"></i>
            <p className="fu-filename d-inline px-2">{this.state.recordedVideo}</p>
          </div>
        </div>
      );

    } else {
      rows = [];
    }
    return rows;
  }

  //To call getmyidea
  public async getEmployeeDetails(ideaOwner: any) {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    // try {
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
    // }
    // catch (ex) {
    //   this.errorLog(ex, "employeedetails", "getEmployeeDetails", "afk-appealapproval");
    // }
  }

  public async getMyIdea() {

    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      UserId: user.prno,//user.userName,
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
    this.getEmployeeDetails(responseData.data[0].enteredby)
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

 separateBysubmitteremailid(data: any): any {
    return data.reduce((result: any, item: any) => {
      if (!result[item.submitteremailid]) {
        result[item.submitteremailid] = [];
      }
      result[item.submitteremailid].push(item);
      return result;
    }, {});
  }
 public isUserIdMatch(dataList: any, loginUserId: any) {
    let dataList1: any = [];
    dataList1 = dataList.filter((a: any) => a.approvername === loginUserId && a.approvalstatus === "Approved");
    return dataList1
  }

  public async getIdeaApproval() {

    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params =
    //  {
    //   ideaid: this.ideaID,
    //   userID: user.prno,//user.userName,
    //   action: ""
    // }
    {
      ideaid: this.ideaID,
      userID: user.prno,
      action: "",//GETAPPROVALBYUSER
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
    let datafilter = responseData.data.filter((a: any) => a.approverrole == "Financialrewardverificationteam");
     if (datafilter.length > 0) {
      let submitterData: any = [];
      submitterData = this.separateBysubmitteremailid(datafilter);
      console.log(submitterData);
      // const submitterDataLength = Object.keys(submitterData).length;
      let flitereddata: any = [];
      flitereddata = this.isUserIdMatch(datafilter, user.prno);
      console.log(flitereddata);
      let isMatch = false;
      if (flitereddata.length > 0) {
        isMatch = true;
      }

      let approvedStatus: any = ""
      if (this.state.lang == 'en') {
        approvedStatus = 'Approved';
      }
      else {
        approvedStatus = 'موافق عليه';
      }


      // if (submitterDataLength >= 3 || isMatch) {
      if (isMatch) {
        if (this.state.lang == 'en') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            errorTitle: this.state.warningMessage,
            errorDescription: "You have already " + approvedStatus + " this idea",

          });
        }
        else {
          this.setState({
            isLoader: false,
            isSuccess: true,
            errorTitle: this.state.warningMessage,
            errorDescription: "لقد وافقتَ على هذه الفكرة بالفعل",

          });
        }
        this.openErrorDialog();
        this.setState({
          isLoader: false,
          isSuccess: true,
          errorTitle: this.state.warningMessage,
          successMessageDesciption: this.state.youHavealready + " " + approvedStatus,
        });
        this.openErrorDialog();
      }
    }
    let dataList = [];
    dataList = responseData.data.filter((a: any) => a.approverrole == "Financialrewardverificationteam");
    let dataList1 = [];
    dataList1 = responseData.data.filter((a: any) => a.approverrole == "HeadofDivisionEvaluationCommittee");
    if(dataList1.length > 0) {
     this.setState({
      RewardAmount1:'AED ' + dataList1[0].roi,
       ROI : dataList1[0].roi
 
      });
    }
    let approvedStatus: any = ""
    //let rejectStatus:any =""
    if (this.state.lang == 'en') {
      if (dataList[0].approvalstatus == 'Approved')
        approvedStatus = 'Approved';
      if (dataList[0].approvalstatus == 'Rejected')
        approvedStatus = 'Rejected'
    }
    else {
      if (dataList[0].approvalstatus == 'Approved')
        approvedStatus = 'تمت الموافقة';
      if (dataList[0].approvalstatus == 'Rejected')
        approvedStatus = 'رفض'
    }
    let currentData:any = false;
    if (dataList.length > 0) {
       let date1 = new Date(dataList[0].enteredon);
       let date2 = new Date(dataList1[0].enteredon);
      //if (sortedItems[0].isreversed == 0) {
      // if(sortedItems[0].isrevised == 1){
      //  currentData =false;
      // }
      // else{
   if (date1 < date2) {
        currentData =false;
      }
      else{
        currentData =true;
      }
      if(currentData){
      this.setState({
        isLoader: false,
        isSuccess: true,
        errorTitle: this.state.warningMessage,
        errorDesciption: this.state.youHavealready + " " + approvedStatus + " " + this.state.thisidea,
      });
       this.openErrorDialog();
      }
    }

  }

  public redirecthome = () => {
    window.location.replace("https://dewa.sharepoint.com.mcas.ms/sites/ideation");
  }
  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    if (lang) {
      let parsedlang = JSON.parse(lang);
      if (parsedlang.lang && parsedlang.lang == "ar") {
        this.setState({
          class: "afkforms-ar", lang: "ar", errorMessage: 'رسالة خطأ', hasBeen: ' تم  ', byYOu: ' بواسطتك', successfully: 'بنجاح.', recordedVideo: 'فيديو مسجل',Max: 'الحد الأقصى',numbers: 'الأرقام ',
          successMessage: 'رسالة نجاح', unableTo: "غير قادرعلى", tryAgainlater: '. يرجى المحاولة مرة أخرى لاحقا.', warningMessage: "رسالة التحذير", youHavealready: 'لقد قمت بالفعل', thisidea: 'هذه الفكرة'
        });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        this.getMyIdea();
        this.getIdeaApproval();
       // this.getEmployeeDetails("");
        // this.getProcessListValues();
      }
      else {
        this.setState({
          class: "afkforms-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video',Max: 'Max',numbers: 'Numbers',
          successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
        });
        this.globalClass = "global-en"
        body.classList.add('global-en');
        this.langCode = 1033;
        this.getMyIdea();
        this.getIdeaApproval();
       // this.getEmployeeDetails("");
        // this.getProcessListValues();
      }
    } else {
      this.setState({
        class: "afkforms-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video',Max: 'Max',numbers: 'Numbers',
        successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getMyIdea();
      this.getIdeaApproval();
    //  this.getEmployeeDetails("");
      // this.getProcessListValues();
    }

  }

  public async submitIdeaApproval(approvalStatus: any) {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    this.callPowerAutomate1();
    await this.getToken();

    this.setState({ isLoader: true, approvalStatus: approvalStatus });
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
      approverremarks: this.state.remarksComment,
      ideatype: null,
      costsaving: 0,
      roi: this.state.ROI,
      relatedideas: null,
      financialimpact: 0,
      feasibility: null,
      impltype: null,
      implresources: null,
      implstartdate: null,
      implenddate: null,
      implbudget: 0,
      implexewaiting: null,
      implaftexewaiting: null,
      implextwaiting: null,
      implneedmoretime: null,
      approverrole: "Financialrewardverificationteam",
      userid: user.prno,//user.userName,
      Keyimeplementer: null,
      score: 0,
      budgetavailable: 0,
      status: "",
      implementationstatus: "",
      submitterscore: 0,
      implementerscore: 0,
      submitteremailid: user.prno,//user.userEmailID,
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
      contributor: null,
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
      let rejectStatus: any;
      if (this.state.lang == 'en') {
        approvedStatus = 'Approved';
        rejectStatus = 'Rejected'
      }
      else {
        approvedStatus = 'تمت الموافقة';
        rejectStatus = 'مرفوض'
      }
      if (responseData.data.respcode > 0) {
        this.insertNotification(this.state.ideaTitle + this.state.hasBeen+ approvalStatus + this.state.byYOu, approvalStatus, this.ideaID, this.state.submitterEmailID, "Financialrewardverificationteam");
        if (!this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "Financialrewardverificationteam", this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID);

        }
        if (this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "Financialrewardverificationteam", this.state.ideaMessage, this.state.submitterUserName, this.state.submitterEmailID);

        }
        if (approvalStatus == "Approved") {
          this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus);
        }
        if (approvalStatus == 'Approved') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            successMessageDesciption: approvedStatus + " " + this.state.successfully,
            successMessageTitle: this.state.successMessage,
          });
          this.openSuccessDialog();
        }
        // if (approvalStatus == "Rejected") {
        //   this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus);
        // }
        if (approvalStatus == 'Rejected') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            successMessageDesciption: rejectStatus + " " + this.state.successfully,
            successMessageTitle: this.state.successMessage,
          });
          this.openSuccessDialog();
        }
        //this.openSuccessDialog();
        console.log(apiResponse);
        // this.setState({
        //   isLoader: false,
        //   isSuccess: true,
        //   successMessageDesciption: approvalStatus + " " + this.state.successfully,
        //   successMessageTitle: this.state.successMessage,
        // });

        // this.openSuccessDialog();
        // console.log(apiResponse);
      } else {
        if (approvalStatus == 'Approved') {
          this.setState({
            isLoader: false,
            isSuccess: false,
            errorTitle: this.state.errorMessage,
            errorDesciption: this.state.unableTo + " " + approvedStatus + " " + this.state.tryAgainlater,
          });
        }
        if (approvalStatus == 'Rejected') {
          this.setState({
            isLoader: false,
            isSuccess: false,
            errorTitle: this.state.errorMessage,
            errorDesciption: this.state.unableTo + " " + rejectStatus + " " + this.state.tryAgainlater,
          });
        }
        this.openErrorDialog();
        // this.setState({
        //   isLoader: false,
        //   isSuccess: false,
        //   errorTitle: this.state.errorMessage,
        //   errorDesciption: "Unable to " + " " + approvalStatus + " " + this.state.tryAgainlater,
        // });
        // this.openErrorDialog();
      }
    } catch (e) {
      this.setState({
        isLoader: false,
        isSuccess: false,
        errorTitle: this.state.errorMessage,
        errorDesciption: "Unable to " + " " + approvalStatus + " " + this.state.tryAgainlater,
      });
      this.openErrorDialog();
    }
  }
  public insertNotification = async (notificationTitle: any, status: any, ideaId: any, ideaOwner: any, pageAction: any) => {
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
      submittername: user.prno,//user.userName,
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
    }

  }
  public approvalEntry = async (approvalStatus: any, approvalRole: any, ideaTitle: any, ideaOwner: any, emailID: any) => {

    const web: any = new Web("https://dewa.sharepoint.com/sites/ideation/");
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
        }

      });
    console.log(listitem);

  }

    public onChangeRewardAmount1(e: any, newValue: any) {
    const numericPart = newValue.replace(/\D/g, '');
    const length = numericPart.length;
    // const length = newValue.length;
    if (!isNaN(length) && length <= 10) {
      this.minRewardAmountLength1 = length;
      const formattedValue = this.formatNumberWithCommas1(numericPart);
      const stringReward = 'AED '+ formattedValue.toString();
      console.log(formattedValue);
      console.log(stringReward)
      this.setState({
        RewardAmount1: stringReward,
        ROI: numericPart,
        // errors: {
        //   ...this.state.errors,
        //  // RewardAmount: '',
        //  ROI: numericPart > 0  ? '' : 'Reward Amount must have range from 1 to 10 numbers.',
        // }
      });
    }
  }

    private formatNumberWithCommas1(value: string): string {
    const numberValue = parseFloat(value.replace(/,/g, ''));
    // Convert the string into a number and then format with commas
   // const numberValue = Number(value);
    
    if (!isNaN(numberValue)) {
      const roundedValue = Math.round(numberValue);
      return roundedValue.toLocaleString(); // This adds commas as thousand separators
    }
    
    return value; // Return the original value if it's not a valid number
  }
  public async getUrls(name: any) {
    const web: any = new Web("https://dewa.sharepoint.com/sites/ideation/");
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
      let url: any = "";
      let flow = await this.getUrls("TokenDispenser");
      url = flow


      //url = `https://prod-08.uaenorth.logic.azure.com:443/workflows/f7351fdf689146519db10889a5b7e2dd/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HNZW-rAqWItlYvHhjACOSwdvxhabU6RJ2r61Mde5LnA`;

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
      let url: any = '';
      //       let flow = await this.getUrls("DisruptiveInnovationManagerRevise");


      //       url = flow + `&challengeID=${challengeID}&challengeTitle=${this.state.Title}&challengeOwner=${this.state.submitterUserNameen}&emailID=${emailID}&challengeType=${this.state.challengeTypeen}&challengeTitlear=${this.state.titlear}&challengeTypear=${this.state.challengeTypear}&challengeOwnerar=${this.state.submitterUserNamear}`
      // console.log(url);
      // let url: any;
      if (approvalStatus == "Approved") {
        let flow = await this.getUrls("FinancialRewardVerificationApprove");
        // url = `https://prod-31.uaenorth.logic.azure.com:443/workflows/463b30093f4b46fd9ce29091be1dc312/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PJwQU88XP3WHuvWzHmk_vyLCCwox4nzswfz6P4u3XBU&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
      }
      else if (approvalStatus == "Rejected") {
        let flow = await this.getUrls("FinanceRewardVerificationTeamNotaccept");
        //url = `https://prod-11.uaenorth.logic.azure.com:443/workflows/e15d6c897bd641f5b16d26e64a170c77/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yU9W1GMePFqn1AKHUYrdj2RnTl6xBl0A0_PVOzDJQ0Y&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
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
      if (this.state.approvalStatus == "Rejected") {
        this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, "Rejected");
         this.redirectHome();
        //this.redirectHeadofDivisionEvaluationCommittee();
      }
      else {
        this.redirectHome();
      }

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
    window.location.replace("https://dewa.sharepoint.com/sites/ideation");
  };
  public redirectHeadofDivisionEvaluationCommittee = () => {
    window.location.replace("https://dewa.sharepoint.com/sites/ideation/SitePages/HeadofDivisionEvaluationCommittee.aspx?ideaID=" + this.ideaID);
  };
  public onChangeRemarksComment(e: any, selctedOptions: any) {

    this.setState({ remarksComment: selctedOptions })

  }

  // changeLanguage() {
  //   const body = document.body;
  //   body.classList.remove(this.globalClass);
  //   let lang: any = localStorage.getItem('lang');
  //   let parsedlang = JSON.parse(lang);
  //   if (parsedlang.lang == "ar") {
  //     this.setState({
  //       class: "challengespage-ar", lang: "ar", errorMessage: 'رسالة خطأ', hasBeen: ' تم  ', byYOu: ' بواسطتك', successfully: 'بنجاح.', recordedVideo: 'فيديو مسجل',
  //       successMessage: 'رسالة نجاح', unableTo: "غير قادرعلى", tryAgainlater: 'الرجاء المحاولة مرة اخرى لاحقاً', warningMessage: "رسالة تحذير", youHavealready: 'لديك بالفعل', thisidea: 'هذه الفكرة'
  //     });
  //     this.globalClass = "global-ar"
  //     body.classList.add('global-ar');
  //     this.langCode = 14337;
  //   }
  //   else {
  //     this.setState({
  //       class: "challengespage-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video',
  //       successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
  //     });
  //     this.globalClass = "global-en"
  //     body.classList.add('global-en');
  //     this.langCode = 1033;
  //   }

  // }


  public render(): React.ReactElement<IAfkFinancialrewardverificationteamProps> {
    //const langText = this.state.lang === "en" ? en : ar;
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;
    return (
      <div className="col-lg-12 afk-financialrewardverificationteam">
        <div className={this.state.class}>
          <div className="row">
            <div className="col-lg-12 back-heading head-navlink">
              <a href="https://dewa.sharepoint.com.mcas.ms/sites/ideation">
                <img
                  className="float-start"
                  src={Backarrow}
                  alt="backarrow-icon"
                  width="16"
                  height="16"

                />
                <h2 className="back-heading ms-3 float-start">
                  {langText.financialrewardverificationteam}
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

             <div className="row mt-4">
              <div className="col-lg-12">

              </div>

             
              <div className="col-lg-6">
                <div className="form-floating">
                  <TextField value={this.state.RewardAmount1}
                    label={langText.roi}
                    description={`${this.state.Max} ${this.minRewardAmountLength1}/10 ${this.state.numbers}.`}
                    // onChange={(e, newValue) => this.setState({ ROI: newValue || '' })}
                    onChange={(e, newValue) =>
                      this.onChangeRewardAmount1(e, newValue)
                    }
                    className="form-control" />
                  {/* <label>ROI Idea numbers to merge</label> */}
                </div>
              </div>
            </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              <p className="vcs-text float-start mb-0 cursor-pointer"><a onClick={() => this.redirectIdeaDetails()}>{langText.clickhere}</a></p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="float-end">
                <div className="float-start">
                  <button data-bs-toggle="modal"
                    data-bs-target="#RejectModel"
                    className="btn-navlink btn btn-outline-secondary p-btn">
                    {langText.revise}
                  </button>
                </div>
                <div className="ms-2 float-start">
                  <button className="btn-navlink btn btn-primary p-btn" onClick={() => this.submitIdeaApproval('Approved')}>
                    {langText.accept}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade e-backdrop"
            id="RejectModel"
            aria-labelledby="SubmitIdeaLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-e modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header pb-0">
                  <button
                    type="button"
                    className="btn-close btn-close-top"
                    data-bs-dismiss="modal"
                    aria-label="Close"

                  ></button>
                </div>
                <div className="modal-body">

                  <div className="row mt-4">

                    <div className="col-lg-12">
                      <div className='form-floating'>
                        <TextField
                          className="form-control"
                          label={langText.remarks}
                          value={this.state.remarksComment}
                          onChange={(e, newValue) => this.onChangeRemarksComment(e, newValue)}
                          multiline autoAdjustHeight
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>


                </div>

                <div className="row">
                  {this.createVideoFilesListItems()}
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


                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer pt-0 justify-content-end">
                  <button
                    type="button"
                    onClick={() => this.submitIdeaApproval('Rejected')}
                    className="btn btn-primary m-btn">
                    {langText.ok}
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
      </div>
    );
  }
}
