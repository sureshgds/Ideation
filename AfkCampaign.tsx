import * as React from 'react';
import type { IAfkCampaignProps } from './IAfkCampaignProps';
import Globeicon from "./../assets/img/svg/globe-icon.png";
import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
import { IAfkCampaignStates } from './IAfkCampaignStates';
import { Web } from 'sp-pnp-js';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
import * as CryptoJS from 'crypto-js';
import NoActionRequired from "./../assets/img/no-action-required.png";

export default class AfkCampaign extends React.Component<IAfkCampaignProps, IAfkCampaignStates, {}> {
  private IdeationServices: IdeationAPIServices;
  public token = "";
  public campaignid: any;
  public fromParams: any = true;
  public userInfo: any;
  public priorToendDate: any;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkCampaignProps, state: IAfkCampaignStates) {
    super(props);
    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.campaignid = params.get('campaignid');


    this.IdeationServices = new IdeationAPIServices();

    this.state = {
      title: "",
      description: "",
      submitterEmailID: "",
      submitterUserName: "",
      isSuccess: false,
      isLoader: false,
      isDialogVisible: false,
      isSuccessDialogVisible: false,
      errorDesciption: "",
      errorTitle: "",
      successMessageDesciption: "",
      successMessageTitle: "",
      url: "",
      createdDate: "",
      showdefault: false,
      type: "",
      teaser: "",
      Source: "",
      DEWAValueChains: "",
      DEWAStartegicArea: "",
      IGTtypes: "",
      TaskForce: "",
      sK0y: "",
      isHMAC: "",
      token: "",
      lang: "en",
      class: "campaignpage-en",
      modalClass: "modal fade",
      englishContent: "",
      arabicContent: "",
      errorMessage: "",
      hasBeen: "",
      byYOu: "",
      successfully: "",
      successMessage: "",
      unableTo: "",
      tryAgainlater: "",
      warningMessage: "",
      youHavealready: "",
      recordedvideo: "",
      thisidea: "",
      titleAR: "",
      typeAR: "",
      solution: "",
      teaserAR: "",
      descriptionAR: "",
      sourceAR: "",
      valueChainAR: "",
      strategicAreaAR: "",
      techniquesTypeAR: "",
      taskForceAR: "",
    }
  }

  public async componentDidMount(): Promise<void> {
    await this.getHMACENABLEorDISABLE();
    await this.getToken();
    this.fetchJsonFile('ar.json');
    this.fetchJsonFile('en.json');
    this.changeLanguage();
    debugger;
    if (this.campaignid != null) {
      this.getCampaign();
      this.getAllSolutions();
    }
    if (this.campaignid == null) {

      this._getListData();
      this.fromParams = false;

    }
    console.log("fromParams", this.fromParams)
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

  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    if (lang) {
      let parsedlang = JSON.parse(lang);
      if (parsedlang.lang && parsedlang.lang == "ar") {
        this.setState({
          class: "campaignpage-ar", lang: "ar", errorMessage: 'رسالة خطأ', hasBeen: ' تم  ', byYOu: ' بواسطتك', successfully: 'تمت الموافقة بنجاح', recordedvideo: 'فيديو مسجل',
          successMessage: 'رسالة نجاح', unableTo: "غير قادرعلى", tryAgainlater: '. يرجى المحاولة مرة أخرى لاحقا.', warningMessage: "رسالة التحذير", youHavealready: 'لقد قمت بالفعل', thisidea: 'هذه الفكرة',
        });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        // this.getMyIdea();
        // this.getIdeaApproval();
        // this.GetEmployeeDetails();
        // this.getProcessListValues();
      }
      else {
        this.setState({
          class: "campaignpage-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: ' Approved Successfully.', recordedvideo: 'Recorded Video',
          successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea',
        });
        this.globalClass = "global-en"
        body.classList.add('global-en');
        this.langCode = 1033;
        // this.getMyIdea();
        // this.getIdeaApproval();
        // this.GetEmployeeDetails();
        // this.getProcessListValues();
      }
    } else {
      this.setState({
        class: "campaignpage-en", lang: "en", errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Approved Successfully.', recordedvideo: 'Recorded Video',
        successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea',
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      // this.getMyIdea();
      // this.getIdeaApproval();
      // this.GetEmployeeDetails();
      // this.getProcessListValues();
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

  // To get getToken method
  public async getToken() {
    try {
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
    catch (ex) {
      this.errorLog(ex, "getToken", "getToken", "afk-campaign");
    }

  }

  // To get HMAC
  public async getHMACENABLEorDISABLE() {
    try {
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
    }
    catch (ex) {
      this.errorLog(ex, "getHMACENABLEorDISABLE", "getHMACENABLEorDISABLE", "afk-campaign");
    }

  };

  generateHMAC(message: any, sKey: any) {
    return CryptoJS.HmacSHA256(message, sKey).toString(CryptoJS.enc.Base64);
  }

  formatDate(inputDate: string): string {
    // Create a Date object from the input string
    const dateObj = new Date(inputDate);

    // Extract year, month, and day
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1); // Months are 0-based
    const day = String(dateObj.getDate());

    // Format as YYYY-MM-DD
    //return `${year}-${month}-${day}`;
    return `${month}-${day}-${year}`;
    //return `${day}-${month}-${year}`;
  }

  formatEndDate(inputDate: string): string {
    // Create a Date object from the input string
    const dateObj = new Date(inputDate);

    // Extract year, month, and day
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1); // Months are 0-based
    const day = String(dateObj.getDate());

    // Format as YYYY-MM-DD
    //return `${year}-${month}-${day}`;
    //return `${month}-${day}-${year}`;
    return `${day}/${month}/${year}`;
  }

  public async getCampaign() {
    this.langCode = this.state.lang == 'ar' ? '14337' : '1033'
    debugger;
    this.setState({ isLoader: true });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      UserId: user.userName,
      CAMPAIGNID: this.campaignid,
      SEARCHTYPE: "CAMPAIGNID",
      languagecode: this.langCode
      //UserId: user.userName,
      // campaignid: this.campaignid,
      // action: "GETIDEABYID"



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
    let res: any = [];
    if (this.fromParams) {
      let startDate = this.formatDate(responseData.data[0].startdate);
      let endDate = this.formatDate(responseData.data[0].enddate);
      const today = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      res.push(today >= start && today <= end);
      let dueDay = this.getDateDifferenceInDays(responseData.data[0].enddate, new Date());
      this.priorToendDate = Math.round(dueDay);
      const createdDate = this.formatEndDate(responseData.data[0].enddate)
      this.setState({ createdDate: createdDate, showdefault: false });
    }
    console.log(res);
    if (this.fromParams) {
      this.getAttachment();
    }
    if (this.state.lang == 'en') {

      // if(this.campaignid!=null&&this.campaignid!=undefined&&this.campaignid!=""){}
      this.setState({
        isLoader: false,
        title: responseData.data[0].title,
        description: responseData.data[0].description,
        type: responseData.data[0].type,
        teaser: responseData.data[0].teaser,
        Source: responseData.data[0].source,
        DEWAValueChains: responseData.data[0].value_chain,
        DEWAStartegicArea: responseData.data[0].strategic_area,
        IGTtypes: responseData.data[0].techniques_type,
        TaskForce: responseData.data[0].task_force,
        submitterEmailID: responseData.data[0].submitteremailid,
        submitterUserName: responseData.data[0].submittername,
        // titleAR: responseData.data[0].titleAR,
        // typeAR: responseData.data[0].typeAR,
        // teaserAR: responseData.data[0].teaserAR,
        // descriptionAR: responseData.data[0].descriptionAR,
        // sourceAR: responseData.data[0].sourceAR,
        // valueChainAR: responseData.data[0].valueChainAR,
        // strategicAreaAR: responseData.data[0].strategicAreaAR,
        // techniquesTypeAR: responseData.data[0].techniquesTypeAR,
        //taskForceAR: responseData.data[0].description,
      });

    } else {
      this.setState({
        isLoader: false,
        // title: responseData.data[0].title,
        // description: responseData.data[0].description,
        // type: responseData.data[0].type,
        // teaser: responseData.data[0].teaser,
        // Source: responseData.data[0].source,
        // DEWAValueChains: responseData.data[0].value_chain,
        // DEWAStartegicArea: responseData.data[0].strategic_area,
        // IGTtypes: responseData.data[0].techniques_type,
        // IGTtypes: responseData.data[0].task_force,
        submitterEmailID: responseData.data[0].submitteremailid,
        submitterUserName: responseData.data[0].submittername,
        title: responseData.data[0].titleAR,
        type: responseData.data[0].typeAR,
        teaser: responseData.data[0].teaserAR,
        description: responseData.data[0].descriptionAR,
        Source: responseData.data[0].sourceAR,
        DEWAValueChains: responseData.data[0].valueChainAR,
        DEWAStartegicArea: responseData.data[0].strategicAreaAR,
        IGTtypes: responseData.data[0].techniquesTypeAR,
        TaskForce: responseData.data[0].taskforceAR,
      });

    }



  }

  // To store attachment into list
  public getAttachment = async () => {
    try {
      try {

        let struser: any = localStorage.getItem("userinfo");
        let user = JSON.parse(struser);
        console.log(user);
        let web = new Web("https://dewa.sharepoint.com/sites/qaideation");
        let today: string = (new Date()).toISOString();
        today = `${today.substring(0, today.indexOf('T'))}T00:00:00Z`;
        const response1 = await web.lists.getByTitle("CampaignAttachments").items
          //.select("*", "Author/Title", "AttachmentFiles/*", "Created")
          .filter(`CampaignID eq '${this.campaignid}'`)
          // .expand("Author", "AttachmentFiles")
          .get();
        // console.log(response1);
        // let response1 :any =[]
        // response1 = response2.filter((range:any) => this.isTodayInRange(range.StartDate, range.EndDate));
        console.log(response1);
        // .filter(`Author/Title eq '${user.userName}'`).filter(`IdeationId eq '${this.campaignid}'`)
        //response1.sort((a: { Id: number; }, b: { Id: number; }) => b.Id - a.Id);

        if (response1.length > 0) {
          // Set the state with the URL of the attachment
          let attachmentPath = "Lists/" + "CampaignAttachments" + "/Attachments/";
          let imageUrl = `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${response1[0].Id}/${response1[0].Title}`;
          this.setState({ url: imageUrl });
          // let dueDay = this.getDateDifferenceInDays(response1[0].EndDate, new Date());
          // this.priorToendDate =Math.round(dueDay)
          //l-1===>0
          // Format the created date to display only month and date
          // const createdDate = this.formatEndDate(response1[0].EndDate)

          //const createdDate = new Date(response1[0].Created);
          //const formattedDate = `${createdDate.toLocaleString('default', { month: 'short' })} ${createdDate.getDate()}`;
          //this.setState({ createdDate: createdDate, showdefault: false });
        } else {
          // this.setState({ showdefault: false });
        }
        console.log("url", this.state.url)
      } catch (error) {
        console.error("Error fetching list data: ", error);
        return [];
      }
    }
    catch (ex) {
      this.errorLog(ex, "getAttachment", "getAttachment", "afk-campaign");
    }

  }

  public getAllSolutions = async () => {
    debugger;
    // this.setState({ allSolutionList: [], isLoader: true });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem("userinfo");
    let user = JSON.parse(struser);
    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let params = {
      ideaOwner: user.prno,// user.userName,
      ideaid: this.campaignid,
      action: "CAMPAIGN"
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
    console.log(apiResponse);
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    console.log("allSolutionList", dataList);
    if (dataList.length > 0) {
      console.log("allSolutionList", dataList);

      this.setState({
        isLoader: false,
        // allSolutionList: dataList,
        // listToProcess: dataList,
        solution: parseInt(dataList.length)
      },
        // () => {
        //   this.fetchVideoAttachments();
        // }
      );


      // console.log("State allSolutionList", this.state.allSolutionList);
    }
    else {
      this.setState({

        solution: 0
      },
      );

    }

  }

  // To fetch items from list
  public _getListData = async () => {
    try {
      try {
        debugger;
        let struser: any = localStorage.getItem("userinfo");
        let user = JSON.parse(struser);
        console.log(user);
        let web = new Web("https://dewa.sharepoint.com/sites/qaideation");
        let today: string = (new Date()).toISOString();
        today = `${today.substring(0, today.indexOf('T'))}T00:00:00Z`;
        const response2 = await web.lists.getByTitle("IdeationTeamAttachments").items
          .select("*", "Author/Title", "AttachmentFiles/*", "Created")
          .expand("Author", "AttachmentFiles")
          .get();
        console.log(response2);
        let response1: any = []
        response1 = response2.filter((range: any) => this.isTodayInRange(range.StartDate, range.EndDate));
        console.log(response1);

        // .filter(`Author/Title eq '${user.userName}'`).filter(`IdeationId eq '${this.campaignid}'`)
        response1.sort((a: { Id: number; }, b: { Id: number; }) => b.Id - a.Id);
        //let response = response1.filter((x: any) => { return new Date() <= new Date(x.EndDate) });
        // let l = response.length;
        this.campaignid = response1[0].CampaignID;
        let dueDay = this.getDateDifferenceInDays(response1[0].EndDate, new Date());
        this.priorToendDate = Math.round(dueDay)
        //this.priorToendDate = this.formatTimeElapsedInNumber(response1[0].EndDate);
        console.log(this.priorToendDate);
        if (response1.length > 0) {
          // Set the state with the URL of the attachment
          this.setState({ url: response1[0].AttachmentFiles[0].ServerRelativeUrl });
          //l-1===>0
          // Format the created date to display only month and date
          const createdDate = this.formatEndDate(response1[0].EndDate)
          // const createdDate = new Date(response1[0].Created);
          // const formattedDate = `${createdDate.toLocaleString('default', { month: 'short' })} ${createdDate.getDate()}`;
          this.setState({ createdDate: createdDate, showdefault: false });
        } else {
          // this.setState({ showdefault: false });
        }

        this.getCampaign();
        this.getAllSolutions();
      } catch (error) {
        console.error("Error fetching list data: ", error);
        return [];
      }
    }
    catch (ex) {
      this.errorLog(ex, "_getListData", "_getListData", "afk-campaign");
    }

  }

  isTodayInRange(startDate: string, endDate: string): boolean {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return today >= start && today <= end;
  }

  getDateDifferenceInDays(date1: any, date2: any) {
    const differenceInTime = new Date(date2).getTime() - new Date(date1).getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // convert milliseconds to days
    return Math.abs(differenceInDays); // return the absolute value to avoid negative results
  }

  convertToISODate(dateStr: string): string {
    // Split the input date string into day, month, and year
    const [day, month, year] = dateStr.split('-').map(Number);

    // Create a new Date object using the parsed values
    // Note: Months are 0-based in JavaScript Date, so subtract 1 from month
    const date = new Date(year, month - 1, day);

    // Convert to ISO 8601 string with time set to 00:00:00
    return date.toISOString().split('T')[0] + 'T00:00:00';
  }

  public render(): React.ReactElement<IAfkCampaignProps> {
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;


    return (
      <div className="col-lg-12 afk-campaign-page">
        <div className={this.state.class}>
          {this.campaignid != null && (
            <div className="row m-0">
              <div className="col-lg-12 px-4">
                <div className="row m-0">
                  <div className="col-lg-12 p-0">
                    <h1 className="main-heading01">{langText.campaigncampaign}</h1>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12">
                    <h2 className="h-lh-heading">
                      {this.state.title}
                    </h2>
                    <h3 className="h-idea-heading">
                      {this.state.description}
                    </h3>
                    {(this.state.url != '' &&
                      <h5 className="grey-text02">
                        <img
                          src={Globeicon}
                          alt="edit-icon"
                          width="12"
                          height="12"
                          className="float-start mt-1-5"
                        />
                        {(this.priorToendDate > 6 &&
                          <span className="ms-2 mt-1 float-start">{this.state.createdDate}</span>
                        )}
                        {(this.priorToendDate < 6 && this.priorToendDate <= 2 &&
                          <span className="ms-2 mt-1 float-start date-red">{this.state.createdDate}</span>
                        )}
                        <span className="float-start text-center">
                          <i className="fa fa-circle dot-seperator"></i></span>
                        <span className="float-start text-center">
                          <i className="fa fa-circle dot-seperator"></i>
                          {(this.priorToendDate > 6 &&
                            <span className="ms-2 mt-1 float-start">{langText.duein} {this.priorToendDate} {langText.days}</span>
                          )}
                          {(this.priorToendDate < 6 && this.priorToendDate < 2 &&
                            <span className="ms-2 mt-1 float-start date-red">{langText.duein} {this.priorToendDate} {langText.day}</span>
                          )}
                          {(this.priorToendDate < 6 && this.priorToendDate >= 2 &&
                            <span className="ms-2 mt-1 float-start date-red">{langText.duein} {this.priorToendDate} {langText.days}</span>
                          )}
                        </span>
                        { }
                      </h5>

                    )}


                  </div>

                  <div className="col-lg-12">
                    <hr className="border-topr" />
                  </div>




                  {(this.state.url != '' &&
                    <div className="col-lg-12">
                      <img
                        className="img-fluid mt-1 banner-img campaign-banner-img"
                        src={this.state.url}
                        alt="banner pic"
                      />
                    </div>)}

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.Typecampaign}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.type}

                      </h3>
                    </div>
                  </div>


                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.Teasercampaign}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.teaser}

                      </h3>
                    </div>
                  </div>


                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.Sourcecampaign}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.Source}

                      </h3>
                    </div>
                  </div>




                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.dewavaluechainscampaign}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.DEWAValueChains}

                      </h3>
                    </div>
                  </div>



                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.dewastartegicareacampaign}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.DEWAStartegicArea}

                      </h3>
                    </div>
                  </div>



                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.ideationgenerationtechniquestypescampaign}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.IGTtypes}

                      </h3>
                    </div>
                  </div>



                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.taskforce}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.TaskForce}

                      </h3>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <h2 className="h-lh-heading02">{langText.numberofsolution}</h2>
                      <h3 className="h-idea-heading">
                        {this.state.solution}
                      </h3>
                    </div>
                  </div>





                  {/* {(this.state.url != '' && this.fromParams !=false &&
                  <div className="col-lg-12 p-0 mt-3">
                    <div className="mt-4 mb-3">
                      <a
                        type="button"
                        className="btn btn-primary p-btn"
                        href={`https://dewa.sharepoint.com/sites/qaideation/SitePages/CampaignSolution.aspx?campaignid=${this.campaignid}`}
                      >
                        {langText.shareyoursolutioncampaign}
                      </a>
                    </div>
                  </div>
                )} */}
                  {(this.state.url != '' &&
                    <div className="col-lg-12 p-0 mt-3">
                      <div className="mt-4 mb-3">
                        <a
                          type="button"
                          className="btn btn-primary p-btn"
                          href={`https://dewa.sharepoint.com/sites/qaideation/SitePages/CampaignSolution.aspx?campaignid=${this.campaignid}`}
                        >
                          {langText.shareyoursolutioncampaign}
                        </a>
                      </div>
                    </div>
                  )}


                </div>
              </div>
            </div>

          )}
          <div className="no-action-required">
            <div className="row m-0">
              <div className="col-lg-12 p-0 position-relative text-center">
                <img
                  className="no-action-img"
                  src={NoActionRequired}
                  alt="user pic"
                />
                <h4 className='mt-2'>
                  {langText.noactionsrequired}
                </h4>
                <p className='mt-4'>{langText.Youreallcaughtupnothingneedsyourattentionrightnow}</p>
              </div>
            </div>
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
      </div>


    );
  }
}
