import * as React from 'react';
import type { IAfkHeadofdivisionevaluationcommitteeProps } from './IAfkHeadofdivisionevaluationcommitteeProps';

import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
import Backarrow from "./../assets/img/svg/back-arrow.png";
import { ChoiceGroup, } from '@fluentui/react/lib/ChoiceGroup';
import { TextField } from '@fluentui/react/lib/TextField';
import { IHeadofdivisionevaluationcommitteeStates } from './IHeadofdivisionevaluationcommitteeStates';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
import { Web } from 'sp-pnp-js';
import { DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, IDropdownOption, IStackTokens, Stack } from '@fluentui/react';
import * as CryptoJS from 'crypto-js';
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';

// const dropdownStyles = {
//   dropdown: { width: "100%" },

// };
const stackTokens: IStackTokens = { childrenGap: 20 };
const dropdownStyles = { dropdown: { width: "100%" } };

// const radiooptions01: IChoiceGroupOption[] = [
//   // { key: "A", text: "Radical" },
//   // { key: "B", text: "Sustaining" },
//   // { key: "C", text: "Incremental" },
// ];


// const radiooptions02: IChoiceGroupOption[] = [
//   { key: "A", text: "Yes" },
//   { key: "B", text: "No" }
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
export default class AfkHeadofdivisionevaluationcommittee extends React.Component<IAfkHeadofdivisionevaluationcommitteeProps, IHeadofdivisionevaluationcommitteeStates, {}> {
  private IdeationServices: IdeationAPIServices;
  public token = "";
  public ideaID: any;
  public userInfo: any;
  public ideaToMerge: any;
  public alreadyMergedIdeaID: any;
  public alreadyMergedIdeaDesc: any = '';
  public minRewardAmountLength: any = 0;
  public minRewardAmountLength1: any = 0;
  public minRewardAmountLength2: any = 0;
  ideaWithFrom: any;
  isFrom: any;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkHeadofdivisionevaluationcommitteeProps, state: IHeadofdivisionevaluationcommitteeStates) {
    super(props);
    let search = window.location.search;
    let params = new URLSearchParams(search);
    //this.ideaID = params.get('ideaID');
    this.alreadyMergedIdeaID = 0;
    this.ideaWithFrom = params.get("ideaID");
    if (this.ideaWithFrom != null) {
      let paramArr: any = [];
      paramArr = this.ideaWithFrom!.split('_')
      this.ideaID = paramArr[0];
      this.isFrom = paramArr[1];
    }

    this.IdeationServices = new IdeationAPIServices();

    this.state = {
      ideaTitle: "",
      ideaMessage: "",
      radiooptions01: [],
      radiooptions02: [],
      selectedIdeaTypeKey: "Radical",
      selectedIdeaTypeText: "Radical",
      selectedFinancialImpactKey: "Yes",
      selectedFinancialImpactText: "Yes",
      showTextBox: true,
      showTextBox1: false,
      showTextBox2: true,
      costSaving1: 0,
      costSaving: 0,
      RewardAmount: 'AED',
      RewardAmount1: 'AED',
      RewardAmount2: 'AED',
      errors: {},
      idea: '',
      ROI: 0,
      radiooptions03: [
        // { key: 1, text: "Once" },
        // { key: 2, text: "Recurring" }
      ],
      selectedFinancialImpactKey1: "",
      selectedFinancialImpactText1: "",
      submitterEmailID: "",
      submitterUserName: "",
      ideaToMerge: [],
      manager: [],
      managerselected: "",
      managerselected1: [],
      selectedIdeaToMergeKey: "",
      selectedIdeaToMergeText: "",
      isSuccess: false,
      isLoader: true,
      isDialogVisible: false,
      isSuccessDialogVisible: false,
      errorDescription: "",
      errorTitle: "",
      successMessageDesciption: "",
      successMessageTitle: "",
      radicalTotalWeightage: 0,
      sustainingTotalWeightage: 0,
      incrementalTotalWeightage: 0,
      remarksComment: "",
      sK0y: "",
      isHMAC: "",
      Max: "",
      numbers: "",
      token: "",
      videoURL: "",
      videoType: "",
      isCampaign: false,
      campaignID: 0,
      selectedMergeTextDesc: '',
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
      rejectedMessage: "",
      arabicContent: "",
      thisidea: ""
    }
  }

  public async componentDidMount(): Promise<void> {
    if (this.ideaID != null) {
      await this.getHMACENABLEorDISABLE();
      await this.getToken();
      //this.getIdeaApproval();
      // this.getMyIdea();
      // this.GetEmployeeDetails();
      // this.getProcessListValues();
      this.changeLanguage();
      this.fetchJsonFile('ar.json');
      this.fetchJsonFile('en.json');


      //this.loadVideos();
      // this.getCriteriaCalculationAFKARIList();
    }
  }

  public async mergedIdeaDetails() {
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
    this.alreadyMergedIdeaDesc = responseData.data[0].ideadescr;
  }

  // Construct the query parameters
  public async getIdeaMergeDetails() {

    try {
      this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
      let apiResponse: any;
      let responseData: any = [];
      const queryParams = new URLSearchParams({
        key: "content",
        value: this.state.ideaTitle
      }).toString();

      // Generate the HMAC value based on the query parameters
      const sK0y = this.state.sK0y;
      const hmacValue = this.generateHMAC(queryParams, sK0y);

      // Construct headers with or without HMAC based on the state
      let headers: any;
      if (this.state.isHMAC === "Enable") {
        headers = {
          'headers': {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'hmac-base64': hmacValue,
            'Authorization': `Bearer ${this.state.token}`
          }
        };
      } else {
        headers = {
          'headers': {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        };
      }

      // Make the API call with query parameters included in the URL
      apiResponse = await this.IdeationServices.getMerging(headers, "merging_details?key=content&value=" + this.state.ideaMessage
        // `merging_details?${queryParams}`

      );

      responseData = apiResponse.data;
      console.log("getIdeaMergeDetails", responseData);
      // Map the response data according to the actual structure
      // let ideaToMergeArray: any;
      let ideaToMerge: any = [];
      if (responseData.documents) {
        ideaToMerge = responseData.documents.map((item: any) => ({
          key: item.idead_id,          // Use the correct field name from API response
          text: "IdeaID : " + item.idead_id + ", " + "content : " + item.description,     // Use the correct field name from API response
          desc: item.description
        }));
      }

      // Update the state if needed
      this.setState({
        // Set state with appropriate data if required
        ideaToMerge: ideaToMerge
      });
    }
    catch (ex) {
      this.errorLog(ex, "merging_details?key=title&value=", "getIdeaMergeDetails", "afk-targetdivisionchampion");
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

  public async getProcessListValues() {
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    //this.getToken();
    let apiResponse: any;
    let responseData: any = [];
    let jtv: any = localStorage.getItem("Jtv");
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
      apiResponse = await this.IdeationServices.getData(params, headers, "getProcessListValues");
    } catch (e) {
      console.log("Exception", e);
    }
    responseData = apiResponse.data.data;
    let values = responseData;
    values = values.filter((x: any) => {
      return x.fieldname.toLowerCase() == "solutionorideatype";
    });
    let radiooptions01: any = [];
    values.map((a: any) => {
      let obj = { key: "", text: "" };
      obj.key = a.listvalue;
      obj.text = a.listvalue;
      radiooptions01.push(obj);
    });
    this.setState({ radiooptions01: radiooptions01 });

    values = responseData;
    values = values.filter((x: any) => {
      return x.fieldname.toLowerCase() == "confirmation";
    });
    let radiooptions02: any = [];
    values.map((a: any) => {
      let obj = { key: "", text: "" };
      obj.key = a.listvalue;
      obj.text = a.listvalue;
      radiooptions02.push(obj);
    });
    this.setState({ radiooptions02: radiooptions02 });
    values = responseData;
    values = values.filter((x: any) => {
      return x.fieldname.toLowerCase() == "roi";
    });
    let InnovationType: any = [];
    values.map((a: any) => {
      let obj = { key: "", text: "" };
      obj.key = a.listvalue;
      obj.text = a.listvalue;
      InnovationType.push(obj);
    });
    this.setState({ radiooptions03: InnovationType });
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
  getCriteriaCalculationAFKARIList = async () => {
    try {
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation");
      const listItems: any = await web.lists.getByTitle("CriteriaCalculationAFKARI")
        .items
        .filter(`IdeaID eq '${this.ideaID}'`)
        //.filter(`IdeaID eq '${this.ideaID}'`)
        .get();

      if (listItems.length > 0) {
        let radicalSumValue: any = 0;
        let sustainingSumValue: any = 0;
        let incrementalSumValue: any = 0;
        let radicalAvargeWeightage: any;
        let sustainingAvargeWeightage: any;
        let incrementalAvargeWeightage: any;
        if (listItems.length >= 3) {
          for (var i = 0; i < listItems.length; i++) {
            radicalSumValue = radicalSumValue + listItems[i].RadicalTotalWeightage;
            sustainingSumValue = sustainingSumValue + listItems[i].SustainingTotalWeightage;
            incrementalSumValue = incrementalSumValue + listItems[i].IncrementalTotalWeightage;
          }
          radicalAvargeWeightage = radicalSumValue / listItems.length;
          sustainingAvargeWeightage = sustainingSumValue / listItems.length;
          incrementalAvargeWeightage = incrementalSumValue / listItems.length;
          this.setState({ radicalTotalWeightage: radicalAvargeWeightage, sustainingTotalWeightage: sustainingAvargeWeightage, incrementalTotalWeightage: incrementalAvargeWeightage });
        }


        console.log("getCriteriaCalculationAFKARIList", listItems)
      } else {
        console.log('No document found for the specified ideaID.');
      }
    } catch (error: any) {
      console.log('Error loading document URL:', error);
    }
  };
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

    console.log("getMyIdea", responseData);
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
      this.getIdeaMergeDetails();

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

    // params =
    // {
    //   employeenumber: "",
    //   division: "10003806",
    //   usertype: "KIMP"
    // }

    // apiResponse = await this.IdeationServices.postDataEmployeeDEtails(params, headers, "employeedetails");
    // responseData = apiResponse.data.usermstrlist;
    // console.log("employeedetails", responseData);

    // const employeeManager = responseData.map((employee: any) => ({
    //   key: employee.pernernumber.toString(),
    //   text: '\u200B',
    //   data: {
    //     name: employee.employeename,
    //     designation: employee.employeedesignation,
    //   },
    // }));

    // this.setState({ manager: employeeManager });
  }

  public async GetEmployeeDetails() {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    // try {
    let apiResponse: any;
    let responseData: any = [];

    let params =
    {
      employeenumber: "",
      division: "10003806",
      usertype: "KIMP",
      taskforce: "SPCO"
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
    // // }
    // catch (ex) {
    //   this.errorLog(ex, "employeedetails", "getEmployeeDetails", "afk-appealapproval");
    // }

    // params =
    // {
    //   employeenumber: "",
    //   division: "10003806",
    //   usertype: "KIMP"
    // }

    apiResponse = await this.IdeationServices.postDataEmployeeDEtails(params, headers, "employeedetails");
    responseData = apiResponse.data.usermstrlist;
    console.log("employeedetails", responseData);

    const employeeManager = responseData.map((employee: any) => ({
      key: employee.pernernumber.toString(),
      text: '\u200B',
      data: {
        name: employee.employeename,
        designation: employee.employeedesignation,
      },
    }));

    this.setState({ manager: employeeManager });
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

  sortByDateDescending = (arr: any): any => {
    return arr.sort((a: any, b: any) => new Date(b.enteredon).getTime() - new Date(a.enteredon).getTime());
  };

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
    debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'

    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params =
    // {
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
    console.log("getIdeaApproval", responseData);

    if (responseData.data.length > 0) {
      let submitterData: any = [];
      submitterData = this.separateBysubmitteremailid(responseData.data);
      console.log(submitterData);
      // const submitterDataLength = Object.keys(submitterData).length;
      let flitereddata: any = [];
      flitereddata = this.isUserIdMatch(responseData.data, user.prno);
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
    let calculationFilterList = [];
    calculationFilterList = responseData.data.filter((a: any) => a.approverrole == "Divisionhybridinnovationcommittee");
    if (calculationFilterList.length > 0) {
      let radicalSumValue: any = 0;
      let sustainingSumValue: any = 0;
      let incrementalSumValue: any = 0;
      let radicalAvargeWeightage: any;
      let sustainingAvargeWeightage: any;
      let incrementalAvargeWeightage: any;
      if (calculationFilterList.length >= 3) {
        for (var i = 0; i < calculationFilterList.length; i++) {
          radicalSumValue = radicalSumValue + calculationFilterList[i].radicaltotalweightage;
          sustainingSumValue = sustainingSumValue + calculationFilterList[i].sustainingtotalweightage;
          incrementalSumValue = incrementalSumValue + calculationFilterList[i].incrementaltotalweightage;
        }
        radicalAvargeWeightage = radicalSumValue / calculationFilterList.length;
        sustainingAvargeWeightage = sustainingSumValue / calculationFilterList.length;
        incrementalAvargeWeightage = incrementalSumValue / calculationFilterList.length;
        this.setState({ radicalTotalWeightage: Math.round(radicalAvargeWeightage), sustainingTotalWeightage: Math.round(sustainingAvargeWeightage), incrementalTotalWeightage: Math.round(incrementalAvargeWeightage) });
      }


      console.log("getCriteriaCalculationAFKARIList", calculationFilterList)
    } else {
      console.log('No document found for the specified ideaID.');
    }
    let sortedcalculationFilterList: any = [];
    sortedcalculationFilterList = this.sortByDateDescending(calculationFilterList);

    let dataList = [];
    dataList = responseData.data.filter((a: any) => a.approverrole == "HeadofDivisionEvaluationCommittee");
    let dataList1 = [];
    dataList1 = responseData.data.filter((a: any) => a.approverrole == "Financialrewardverificationteam");

    let sortedItems = [];
    sortedItems = this.sortByDateDescending(dataList);
    console.log(sortedItems);

    let currentData: any = false;
    let blnFinance: boolean = false;
    if (dataList.length > 0) {

      if (dataList1.length > 0 && dataList1[0].approvalstatus == 'Rejected') {
        let date2 = new Date(sortedItems[0].enteredon);
        let date1 = new Date(dataList1[0].enteredon);
        if (date1 > date2) {
          blnFinance = false;
        }
        else {
          blnFinance = true;
        }
      }
      if (sortedcalculationFilterList.length > 0) {

        let date1 = new Date(sortedcalculationFilterList[0].enteredon);
        let date2 = new Date(sortedItems[0].enteredon);
        if (date1 < date2) {
          currentData = true;
        }
        else {
          currentData = false;
        }
      }


      //if (sortedItems[0].isreversed == 0) {
      // if(sortedItems[0].isrevised == 1){
      //  currentData =false;
      // }
      // else{

    }
    //}

    //   if(currentData){
    //     let approvedStatus:any='';
    // let rejectStatus:any;
    // let rejectStatus1:any;
    //     if(this.state.lang == 'en'){
    //   approvedStatus = 'Approved';
    //   rejectStatus = 'Rejected';
    //   rejectStatus1 = 'Returntoevaluationteam'
    // }
    // else{
    //   approvedStatus = 'تمت الموافقة';
    //   rejectStatus = 'مرفوض';
    //   rejectStatus1 = 'فريق العودة إلى التقييم'
    // }
    //        if(dataList[0].approvalstatus == 'Approved'){
    //   this.setState({
    //     isLoader: false,
    //     isSuccess: true,
    //     errorTitle: this.state.warningMessage,
    //     errorDesciption: this.state.youHavealready + " " + approvedStatus + " " + this.state.thisidea,
    //   });}
    //   if(dataList[0].approvalstatus == 'Rejected'){
    //     this.setState({
    //       isLoader: false,
    //       isSuccess: true,
    //       errorTitle: this.state.warningMessage,
    //       errorDesciption: this.state.youHavealready + " " + rejectStatus + " " + this.state.thisidea,
    //     });}
    //     if(dataList[0].approvalstatus == 'Returntoevaluationteam'){
    //       this.setState({
    //         isLoader: false,
    //         isSuccess: true,
    //         errorTitle: this.state.warningMessage,
    //         errorDesciption: this.state.youHavealready + " " + rejectStatus1 + " " + this.state.thisidea,
    //       });}
    //   this.openErrorDialog();
    //   }
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
    let approvedStatus: any = '';
    let rejectStatus: any;
    let rejectStatus1: any;
    if (this.state.lang == 'en') {
      approvedStatus = 'Approved';
      rejectStatus = 'Rejected';
      rejectStatus1 = 'Returntoevaluationteam'
    }
    else {
      approvedStatus = 'تمت الموافقة';
      rejectStatus = 'مرفوض';
      rejectStatus1 = 'فريق العودة إلى التقييم'
    }
    console.log(dataList.length, noOfTimes, currentData, blnFinance, dataList[0].approvalstatus, approvedStatus, rejectStatus, rejectStatus1);
    if (dataList.length >= noOfTimes && currentData && blnFinance) {
      if (dataList[0].approvalstatus === approvedStatus) {
        this.setState({
          isLoader: false,
          isSuccess: true,
          errorTitle: this.state.warningMessage,
          errorDescription: this.state.youHavealready + " " + approvedStatus + " " + this.state.thisidea,
        }, () => this.openErrorDialog());
      }

      if (dataList[0].approvalstatus === 'Rejected') {
        this.setState({
          isLoader: false,
          isSuccess: true,
          errorTitle: this.state.warningMessage,
          errorDescription: this.state.youHavealready + " " + rejectStatus + " " + this.state.thisidea,
        }, () => this.openErrorDialog());
      }

      if (dataList[0].approvalstatus === 'Returntoevaluationteam') {
        this.setState({
          isLoader: false,
          isSuccess: true,
          errorTitle: this.state.warningMessage,
          errorDescription: this.state.youHavealready + " " + rejectStatus1 + " " + this.state.thisidea,
        }, () => this.openErrorDialog());
      }
    }
    let dataList2 = [];
    dataList2 = responseData.data.filter((a: any) => a.approverrole == "Targetdivisionchampion");
    this.alreadyMergedIdeaID = Number(dataList2[0].relatedideas);
    if (this.alreadyMergedIdeaID) {
      this.mergedIdeaDetails();
    }
  }
  public onChangeIdeaType(e: any, selctedOptions: any) {
    this.setState({ selectedIdeaTypeKey: selctedOptions.key, selectedIdeaTypeText: selctedOptions.text })

  }
  public onChangeFinancialImpact(e: any, selctedOptions: any) {
    if (selctedOptions.key == "Yes" || selctedOptions.text == "نعم") {
      this.setState({ showTextBox: true, showTextBox2: true, selectedFinancialImpactKey1: "" });
    }
    else {
      this.setState({ showTextBox: false, showTextBox2: false, showTextBox1: false, selectedFinancialImpactKey1: "" });
    }
    this.setState({ selectedFinancialImpactKey: selctedOptions.key, selectedFinancialImpactText: selctedOptions.text })

  }
  public onChangeFinancialImpact1(e: any, selctedOptions: any) {
    if (selctedOptions.text == "Recurring" || selctedOptions.text == "يتكرر") {
      this.setState({ showTextBox1: true });
    }
    else {
      this.setState({ showTextBox1: false });
    }
    this.setState({ selectedFinancialImpactKey1: selctedOptions.key, selectedFinancialImpactText1: selctedOptions.text })

  }
  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    if (lang) {
      let parsedlang = JSON.parse(lang);
      if (parsedlang.lang && parsedlang.lang == "ar") {
        this.setState({
          class: "afkforms-ar", lang: "ar", rejectedMessage: 'تم رفض الحملة', errorMessage: 'رسالة خطأ', hasBeen: 'تم ', byYOu: ' بواسطتك.', successfully: 'بنجاح.', recordedVideo: 'فيديو مسجل', Max: 'الحد الأقصى', numbers: 'الأرقام ',
          successMessage: 'رسالة نجاح', idea: 'لقد كانت هذه الفكرة', unableTo: 'غير قادرعلى', tryAgainlater: '. يرجى المحاولة مرة أخرى لاحقا.', warningMessage: "رسالة التحذير", youHavealready: 'لقد قمت بالفعل', thisidea: 'هذه الفكرة',
        });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        this.getMyIdea();
        this.getIdeaApproval();
        this.GetEmployeeDetails();
        this.getProcessListValues();
      }
      else {
        this.setState({
          class: "afkforms-en", lang: "en", rejectedMessage: 'The campaign has been rejected', errorMessage: 'Error Message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully.', recordedVideo: 'Recorded Video', Max: 'Max', numbers: 'Numbers',
          successMessage: 'Success Message', idea: 'This Idea has been ', unableTo: 'Unable to', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea',
        });
        this.globalClass = "global-en"
        body.classList.add('global-en');
        this.langCode = 1033;
        this.getMyIdea();
        this.getIdeaApproval();
        this.GetEmployeeDetails();
        this.getProcessListValues();
      }
    } else {
      this.setState({
        class: "afkforms-en", lang: "en", errorMessage: 'Error Message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully.', recordedVideo: 'Recorded Video', Max: 'Max', numbers: 'Numbers',
        successMessage: 'Success Message', idea: 'This Idea has been ', unableTo: 'Unable to', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea',
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getMyIdea();
      this.getIdeaApproval();
      this.GetEmployeeDetails();
      this.getProcessListValues();
    }

  }
  public async submitIdeaApproval(approvalStatus: any) {
    debugger;
    //debugger;
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    this.callPowerAutomate1();
    await this.getToken();
    this.setState({ isLoader: true });
    let financialimpact: number = 0;
    if (this.state.selectedFinancialImpactText == "Yes" || this.state.selectedFinancialImpactText == "نعم") {
      financialimpact = parseInt(this.state.ROI) + parseInt(this.state.costSaving);
    }
    else {
      financialimpact = 0;
    }
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
      ideatype: this.state.selectedIdeaTypeText,
      costsaving: this.state.costSaving,
      roi: this.state.ROI,
      relatedideas: this.state.selectedIdeaToMergeKey,
      financialimpact: financialimpact,
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
      approverrole: "HeadofDivisionEvaluationCommittee",
      userid: user.prno,//user.userName,
      Keyimeplementer: this.state.managerselected,
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
      recurringamount: parseInt(this.state.costSaving1),
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
      let rejectStatus1: any;
      if (this.state.lang == 'en') {
        approvedStatus = 'Approved';
        rejectStatus = 'Rejected';
        rejectStatus1 = 'Returntoevaluationteam'
      }
      else {
        approvedStatus = 'تمت الموافقة';
        rejectStatus = 'مرفوض';
        rejectStatus1 = 'فريق العودة إلى التقييم'
      }
      if (responseData.data.respcode > 0) {
        if (this.state.selectedIdeaToMergeKey) {
          this.submitIdeaAI(this.state.selectedIdeaToMergeKey, this.state.selectedMergeTextDesc, -1);
        }
        if (this.alreadyMergedIdeaID != this.state.selectedIdeaToMergeKey) {
          this.submitIdeaAI(this.alreadyMergedIdeaID, this.alreadyMergedIdeaDesc, 0);

        }
        this.insertNotification(this.state.ideaTitle + this.state.hasBeen + approvalStatus + this.state.byYOu, approvalStatus, this.ideaID, this.state.submitterEmailID, "HeadofDivisionEvaluationCommittee");
        if (!this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "HeadofDivisionEvaluationCommittee", this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID);
        }
        if (this.state.isCampaign) {
          this.approvalEntry(approvalStatus, "HeadofDivisionEvaluationCommittee", this.state.ideaMessage, this.state.submitterUserName, this.state.submitterEmailID);
        }

        //this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus);
        this.callPowerAutomate(this.ideaID, this.state.ideaTitle, this.state.submitterUserName, this.state.submitterEmailID, approvalStatus, user.userName, user.userEmailID);
        if (approvalStatus == 'Approved') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            successMessageDesciption: approvedStatus + " " + this.state.successfully,
            successMessageTitle: this.state.successMessage,
          });
        }
        if (approvalStatus == 'Rejected') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            // successMessageDesciption: this.state.idea +""+rejectStatus ,
            successMessageDesciption: this.state.rejectedMessage,
            successMessageTitle: this.state.successMessage,
          });
        }
        if (approvalStatus == 'Returntoevaluationteam') {
          this.setState({
            isLoader: false,
            isSuccess: true,
            successMessageDesciption: this.state.idea + "" + rejectStatus1,
            successMessageTitle: this.state.successMessage,
          });
        }
        this.openSuccessDialog();
        console.log(apiResponse);
      } else {
        if (approvalStatus == 'Approved') {
          this.setState({
            isLoader: false,
            isSuccess: false,
            errorTitle: this.state.errorMessage,
            errorDescription: this.state.unableTo + " " + approvedStatus + " " + this.state.tryAgainlater,
          });
        }
        if (approvalStatus == 'Rejected') {
          this.setState({
            isLoader: false,
            isSuccess: false,
            errorTitle: this.state.errorMessage,
            errorDescription: this.state.unableTo + " " + rejectStatus + " " + this.state.tryAgainlater,
          });
        }
        if (approvalStatus == 'Returntoevaluationteam') {
          this.setState({
            isLoader: false,
            isSuccess: false,
            errorTitle: this.state.errorMessage,
            errorDescription: this.state.unableTo + " " + rejectStatus1 + " " + this.state.tryAgainlater,
          });
        }
        this.openErrorDialog();
      }
    } catch (e) {
      this.setState({
        isLoader: false,
        isSuccess: false,
        errorTitle: this.state.errorMessage,
        errorDescription: this.state.unableTo + " " + approvalStatus + " " + this.state.tryAgainlater,
      });
      this.openErrorDialog();
    }
  }

  //to call submitIdeaId API
  public async submitIdeaAI(ideaId: any, desc: any, permission: any) {
    try {

      let apiResponse: any;
      let url: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);

      let params = {
        "title_dict": { "title": '' },
        "content_dict": { "content": desc }
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
      url = "write_in_database?ideaid=" + ideaId + "&permission=" + permission
      apiResponse = await this.IdeationServices.submitIdeaInAI(params, url, headers);
      let dataList = apiResponse.data;
      console.log(dataList);
    }
    catch (ex) {
      this.errorLog(ex, "write_in_database?ideaid=", "submitIdeaAI", "afk-targetdivisionchampion");
    }
  }

  public errorLog = async (Exception: any, API: any, MethodName: any, Webpart: any) => {

    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
    const listitem: any = await web.lists.getByTitle("AFKARILogHistory").items.add(
      {
        Exception: Exception,
        API: API,
        MethodName: MethodName,
        Webpart: Webpart
      }).then((res: any) => {
        if (res) {
          console.log("error logged", res);
        }

      });
    console.log(listitem);

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
      let url: any = "";
      let flow = await this.getUrls("TokenDispenser");
      url = flow


      // url = `https://prod-08.uaenorth.logic.azure.com:443/workflows/f7351fdf689146519db10889a5b7e2dd/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HNZW-rAqWItlYvHhjACOSwdvxhabU6RJ2r61Mde5LnA`;

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
  public async callPowerAutomate(p_ideaID: any, p_ideaTitle: any, p_ideaOwner: any, p_emailID: any, approvalStatus: any,
    loggedInUser: any,
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
      //       let flow = await this.getUrls("DisruptiveInnovationManagerRevise");


      //       url = flow + `&challengeID=${challengeID}&challengeTitle=${this.state.Title}&challengeOwner=${this.state.submitterUserNameen}&emailID=${emailID}&challengeType=${this.state.challengeTypeen}&challengeTitlear=${this.state.titlear}&challengeTypear=${this.state.challengeTypear}&challengeOwnerar=${this.state.submitterUserNamear}`
      // console.log(url);
      //let url: any = '';
      if (approvalStatus == "Approved") {
        let flow = await this.getUrls("HeadofDivisionEvaluationCommitteeApprove");
        // url = `https://prod-07.uaenorth.logic.azure.com:443/workflows/5c563178f29347e6a19e8ca9a44684a0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7Zee2eZUUPlEGYbAzwbRbE3cc-OYOq99RyIncUqxSS4&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=25&groupName=HeadofDivisionEvaluationCommittee&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=25&groupName=HeadofDivisionEvaluationCommittee&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}`
      }
      else if (approvalStatus == "Rejected") {
        let flow = await this.getUrls("HeadofDivisionEvaluationCommitteeReject");
        // url = `https://prod-09.uaenorth.logic.azure.com:443/workflows/63fbe9ca014941338d5236ff01c2b1af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LliVhn2MRn33yrWPST7qOxtkg6QfCVSboejHixCNgIk&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=25&groupName=HeadofDivisionEvaluationCommittee&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&approverComments=${this.state.remarksComment}&IsCampaign=${IsCampaign}&IsFrom=HDEC`
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=25&groupName=HeadofDivisionEvaluationCommittee&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&approverComments=${this.state.remarksComment}&IsCampaign=${IsCampaign}&IsFrom=HDEC`
      }
      else if (approvalStatus == "Returntoevaluationteam") {
        let flow = await this.getUrls("HeadofDivisionEvaluationCommitteeReturn");
        // url = `https://prod-06.uaenorth.logic.azure.com:443/workflows/9962859b894943ecb0ec81879f755130/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hCfWP1SHBmTvl75WM2Jezm9z7v2LPsmCnRySP3hH4ik&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=25&groupName=HeadofDivisionEvaluationCommittee&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}&IsFrom=HDEC`
        url = flow + `&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&emailID=${emailID}&groupID=25&groupName=HeadofDivisionEvaluationCommittee&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}&IsCampaign=${IsCampaign}&SolutionDescription=${this.state.ideaMessage}&IsFrom=HDEC`
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
    this.setState({ isSuccessDialogVisible: true, isSuccess: true });
  };

  private closeSuccessDialog = () => {
    this.setState({ isSuccessDialogVisible: false }, () => {
      if (this.state.isSuccess) {
        this.redirectHome();
      }
    });
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
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      userid: user.prno,//user.userName,
      notificationTitle: notificationTitle,
      status: status,
      useremailID: user.prno,// user.userEmailID,
      submitteremailid: user.userEmailID,
      submittername: user.userName,
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
  public onChangeRemarksComment(e: any, selctedOptions: any) {

    this.setState({ remarksComment: selctedOptions })

  }

  public onChangeideaToMerge(e: any, selctedOptions: any) {
    this.setState({
      selectedIdeaToMergeKey: selctedOptions.key,
      selectedIdeaToMergeText: selctedOptions.text,
      // errors: {
      //   ...this.state.errors,
      //   selectedBenifitsKey: "",
      // },
    });
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {options.map((option, index) => (
          <div key={index} style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', fontWeight: '#888' }}>{option.data.name}</span>
              <span style={{ fontSize: '10px', color: '#666' }}>
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
    let eventid = (event.target as HTMLDivElement).id
    if (option) {
      if (option.key != '' && option.key != null && option.key != undefined) {

        // DrpEmployee.DrpManagerDrpEvaluation/DrpFacilitator/selectedTargetSegmentationKey
        if (eventid.indexOf("DrpManager") >= 0) {
          this.setState({
            managerselected: option.key,
            managerselected1: option.key
          });
        }
      }
    }
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

  public onChangeRewardAmount2(e: any, newValue: any) {
    const numericPart = newValue.replace(/\D/g, '');
    const length = numericPart.length;
    // const length = newValue.length;
    if (!isNaN(length) && length <= 10) {
      this.minRewardAmountLength2 = length;
      const formattedValue = this.formatNumberWithCommas2(numericPart);
      const stringReward = 'AED ' + formattedValue.toString();
      console.log(formattedValue);
      console.log(stringReward)
      this.setState({
        RewardAmount2: stringReward,
        costSaving1: numericPart,
        errors: {
          ...this.state.errors,
          // RewardAmount: '',
          costSaving1: numericPart > 0 ? '' : 'Reward Amount must have range from 1 to 10 numbers.',
        }
      });
    }
  }

  private formatNumberWithCommas2(value: string): string {
    const numberValue = parseFloat(value.replace(/,/g, ''));
    // Convert the string into a number and then format with commas
    // const numberValue = Number(value);

    if (!isNaN(numberValue)) {
      const roundedValue = Math.round(numberValue);
      return roundedValue.toLocaleString(); // This adds commas as thousand separators
    }

    return value; // Return the original value if it's not a valid number
  }

  public onChangeRewardAmount1(e: any, newValue: any) {
    const numericPart = newValue.replace(/\D/g, '');
    const length = numericPart.length;
    // const length = newValue.length;
    if (!isNaN(length) && length <= 10) {
      this.minRewardAmountLength1 = length;
      const formattedValue = this.formatNumberWithCommas1(numericPart);
      const stringReward = 'AED ' + formattedValue.toString();
      console.log(formattedValue);
      console.log(stringReward)
      this.setState({
        RewardAmount1: stringReward,
        ROI: numericPart,
        errors: {
          ...this.state.errors,
          // RewardAmount: '',
          ROI: numericPart > 0 ? '' : 'Reward Amount must have range from 1 to 10 numbers.',
        }
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
  public onChangeRewardAmount(e: any, newValue: any) {
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
        costSaving: numericPart,
        errors: {
          ...this.state.errors,
          // RewardAmount: '',
          costSaving: numericPart > 0 ? '' : 'Reward Amount must have range from 1 to 10 numbers.',
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

  public render(): React.ReactElement<IAfkHeadofdivisionevaluationcommitteeProps> {
    //const langText = this.state.lang === "en" ? en : ar;
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;

    return (
      <div className="col-lg-12 afk-headofdivisionevaluationcommittee">
        <div className={this.state.class}>
          <div className="row">
            <div className="col-lg-12 back-heading head-navlink">
              <a href="https://dewa.sharepoint.com.mcas.ms/sites/qaideation">
                <img
                  className="float-start"
                  src={Backarrow}
                  alt="backarrow-icon"
                  width="16"
                  height="16"
                />
                <h2 className="back-heading ms-3 float-start">
                  {langText.headofdivisionevaluationcommittee}
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

              <h3 className="h-idea-heading"> {this.state.ideaMessage} </h3>
            </div>
          </div>
          {!this.state.isCampaign && (
            <div className="row mt-4">
              <div className="col-lg-12">
                <h2 className="h-lh-heading02">{langText.ideatype}</h2>
              </div>

              <div className="col-lg-12">
                <ChoiceGroup
                  options={this.state.radiooptions01}
                  label=""
                  onChange={(e, selctedOptions) => this.onChangeIdeaType(e, selctedOptions)}
                  selectedKey={this.state.selectedIdeaTypeKey}
                  required={true}
                  styles={choiceGroupStyles}
                />

              </div>
              {(this.state.selectedIdeaTypeText == "Radical" || this.state.selectedIdeaTypeText == "جذري") && (
                <p className='mt-4 mb-0'>{this.state.radicalTotalWeightage}%</p>
              )}
              {(this.state.selectedIdeaTypeText == "Sustainable" || this.state.selectedIdeaTypeText == "مستدام") && (
                <p className='mt-4 mb-0'>{this.state.sustainingTotalWeightage}%</p>
              )}
              {(this.state.selectedIdeaTypeText == "Incremental" || this.state.selectedIdeaTypeText == "تزايدي") && (
                <p className='mt-4 mb-0'>{this.state.incrementalTotalWeightage}%</p>
              )}
            </div>
          )}

          {/* <div className="row mt-4">
          <div className="col-lg-12">
            <h2 className="h-lh-heading02">Key Implementer</h2>
            <h3 className="h-idea-heading">Person</h3>

          </div>
        </div> */}


          <div className="row mt-4">
            <div className="col-lg-12">
              <h2 className="h-lh-heading02 mb-0">{langText.keyimplementor}</h2>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="form-floating">
                <Stack tokens={stackTokens}>
                  <Dropdown
                    className="form-select01 label label-select"
                    placeholder={langText.selectanoption}
                    id="DrpManager"
                    aria-label="Floating label select example"
                    //label="Manager"
                    options={this.state.manager}
                    styles={dropdownStyles}
                    onRenderOption={this.onRenderOption}
                    onRenderTitle={this.onRenderTitle}
                    selectedKey={this.state.managerselected}
                    onChange={this.onChangeEmployee}
                  //errorMessage={this.state.errors.managerselected2}
                  />
                </Stack>

              </div>
            </div>
          </div>


          <div className="row mt-4">
            <div className="col-lg-12">
              <h2 className="h-lh-heading02">{langText.financialimpact}</h2>
            </div>

            <div className="col-lg-12">
              <ChoiceGroup
                defaultSelectedKey="B"
                options={this.state.radiooptions02}
                label=""
                onChange={(e, selctedOptions) => this.onChangeFinancialImpact(e, selctedOptions)}
                selectedKey={this.state.selectedFinancialImpactKey}
                required={true}
                styles={choiceGroupStyles}
              />
            </div>
          </div>
          {this.state.showTextBox && (
            <div className="row mt-4">
              <div className="col-lg-12">

              </div>

              <div className="col-lg-6">
                <div className="form-floating">
                  <TextField
                    // type='number'
                    label={langText.costsaving}
                    value={this.state.RewardAmount}
                    description={`${this.state.Max} ${this.minRewardAmountLength}/10 ${this.state.numbers}.`}
                    // onChange={(e, newValue) => this.setState({ costSaving: newValue || '' })}
                    onChange={(e, newValue) =>
                      this.onChangeRewardAmount(e, newValue)
                    }
                    className="form-control" />
                  {/* <label>Enter the estimated Cost saving</label> */}
                </div>
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
          )}

          {this.state.showTextBox2 && (
            <div className="row mt-4">
              <div className="col-lg-12">
                {/* <h2 className="h-lh-heading02">Financial Impact</h2> */}
              </div>

              <div className="col-lg-12">
                <ChoiceGroup
                  defaultSelectedKey="B"
                  options={this.state.radiooptions03}
                  label=""
                  onChange={(e, selctedOptions) => this.onChangeFinancialImpact1(e, selctedOptions)}
                  selectedKey={this.state.selectedFinancialImpactKey1}
                  required={true}
                  styles={choiceGroupStyles}
                />
              </div>
            </div>
          )}
          {this.state.showTextBox1 && (
            <div className="row mt-4">
              <div className="col-lg-12">

              </div>

              <div className="col-lg-6">
                <div className="form-floating">
                  <TextField
                    //type='number'
                    label={langText.recurringamount}
                    value={this.state.RewardAmount2}
                    // onChange={(e, newValue) => this.setState({ costSaving1: newValue || '' })}
                    onChange={(e, newValue) =>
                      this.onChangeRewardAmount2(e, newValue)
                    }
                    description={`${this.state.Max} ${this.minRewardAmountLength2}/10 ${this.state.numbers}.`}
                    className="form-control" />
                  {/* <label>Enter the estimated Cost saving</label> */}
                </div>
              </div>


              {/* <TextField value={this.state.ROI} label="ROI"
                  onChange={(e, newValue) => this.setState({ ROI: newValue || '' })}
                  className="form-control" /> */}
              {/* <label>ROI Idea numbers to merge</label> */}


            </div>
          )}

          {this.alreadyMergedIdeaID > 0 && (
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="form-floating"><>{langText.ideamerged} {this.alreadyMergedIdeaDesc}</>

                </div>
              </div>
            </div>
          )}

          {this.state.ideaToMerge.length == 0 && (
            <div className="row mt-4">
              <div className="col-lg-12">
                <h2 className="h-lh-heading02">{langText.ideanumberstomerge}</h2>
                <div className="form-floating"><>{langText.noideasfound}</>

                </div>
              </div>
            </div>
          )}
          {this.state.ideaToMerge.length > 0 && (
            <div className='row mt-4'>
              <div className='col-lg-12 back-heading head-navlink'>
                <div className="form-floating">
                  <Stack tokens={stackTokens}>
                    <Dropdown
                      className="form-select01 label-benefitsofdewa  error-star"
                      label={langText.ideanumberstomerge}
                      placeholder={langText.selectanoption}
                      options={this.state.ideaToMerge}
                      styles={dropdownStyles}
                      onChange={(e, selectedOptions) => this.onChangeideaToMerge(e, selectedOptions)}
                      selectedKey={this.state.selectedIdeaToMergeKey}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          )}

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
              <div className='float-start'>
                <div className="float-start">
                  <button data-bs-toggle="modal"
                    data-bs-target="#RejectModel"
                    className="btn-navlink btn btn-secondary p-btn">
                    {langText.reject}
                  </button>
                </div>
              </div>
              <div className="float-end">
                <div className="float-start">
                  <button onClick={() => this.submitIdeaApproval('Returntoevaluationteam')} className="btn-navlink p-btn btn btn-outline-secondary p-btn">
                    {langText.returntoevaluationteam}
                  </button>
                </div>

                <div className="ms-2 float-start">
                  <button onClick={() => this.submitIdeaApproval('Approved')} className="btn-navlink btn btn-primary p-btn">
                    {langText.approve}
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
              subText: `${this.state.errorDescription}`,
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
