import * as React from 'react';
//import styles from './AfkDrafts.module.scss';
import type { IAfkDraftsProps } from './IAfkDraftsProps';
//import { escape } from '@microsoft/sp-lodash-subset';
//import HomeNewsimg01 from "./../assets/img/hnews01.jpg";
import Deletetrash from "./../assets/img/svg/draft/delete-trash.png";
//import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
import { Web } from 'sp-pnp-js';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
import { IAfkDraftsStates } from './IAfkDraftsStates';
import * as CryptoJS from 'crypto-js';
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
// import {
//   DefaultButton,
//   Dialog,
//   DialogFooter,
//   DialogType,
// } from "@fluentui/react";

export default class AfkDrafts extends React.Component<IAfkDraftsProps, IAfkDraftsStates, {}> {
  private IdeationServices: IdeationAPIServices;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkDraftsProps, state: IAfkDraftsStates) {
    super(props);
    this.IdeationServices = new IdeationAPIServices();
    this.state = {
      isSuccess: false,
      isdraftopopup: false,
      isLoader: true,
      allDraftIdeaList: [],
      imageList: [],
      sK0y: "",
      isHMAC: "",
      token: "",
      lang: "en",
      class: "afkdrafts-en",
      englishContent: "",
      arabicContent: "",
      ago: "",
      minute: "",
      hour: "",
      day: "",
      week: "",
      month: "",
      year: "",
      myideaid: ""
    }
  }
  public async componentDidMount(): Promise<void> {
    await this.getHMACENABLEorDISABLE();
    await this.getToken();
    this.getAttachment();
    this.myideas();
    this.fetchJsonFile('ar.json');
    this.fetchJsonFile('en.json');
    this.changeLanguage();
    //this.getToken();

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
  closestage1CommentReportDialog = () => {
    this.setState({ isdraftopopup: false })
  }


  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    if (lang) {
      let parsedlang = JSON.parse(lang);
      if (parsedlang.lang && parsedlang.lang == "ar") {
        // this.setState({
        //   class: "afkdrafts-ar", lang: "ar", 
        //   // errorMessage: 'رسالة خطأ',hasBeen: 'تم ', byYOu: ' بواسطتك.', successfully: 'تم التقديم بنجاح',
        //   // successMessage: 'رسالة نجاح', unableTo: 'غير قادرعلى', tryAgainlater: 'تعذر الإرسال. يرجى المحاولة مرة أخرى لاحقا.',
        // });
        this.setState({ class: "afkdrafts-ar", lang: "ar", ago: 'قبل', minute: 'دقيقة', hour: 'ساعة', day: 'يوم', week: 'أسبوع', month: 'شهر', year: 'سنة' });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        // this.getMyIdea();
        // this.getIdeaApproval();
        // this.GetEmployeeDetails();
        // this.getProcessListValues();
      }
      else {
        // this.setState({
        //   class: "afkdrafts-en", lang: "en", 
        //   //  errorMessage: 'Error Message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Submitted Successfully.',
        //   // successMessage: 'Success Message', unableTo: 'Unable to', tryAgainlater: 'Unable to Submit. Please try again later.',
        // });
        this.setState({ class: "afkdrafts-en", lang: "en", ago: 'ago', minute: 'm', hour: 'h', day: 'd', week: 'w', month: 'm', year: 'y' });
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
        class: "afkdrafts-en", lang: "en",
        // errorMessage: 'Error Message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Submitted Successfully.',
        // successMessage: 'Success Message', unableTo: 'Unable to', tryAgainlater: 'Unable to Submit. Please try again later.',
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
  public async getAttachment() {
    try {
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
      //let columnName = "InnovationID";
      // .filter(`${columnName} eq '${InnovationID}'`)
      const listItems: any = await web.lists.getByTitle("IdeaAttachments")
        .items
        .expand(`AttachmentFiles`)
        .get();
      // Assuming you want to store attachment file names in the state
      let attachmentFiles = [];
      let imageURLList = [];
      attachmentFiles = listItems;
      console.log("attachmentFileNames", attachmentFiles);
      if (attachmentFiles.length > 0) {
        let attachmentPath = "Lists/" + "IdeaAttachments" + "/Attachments/";
        for (let i = 0; i < attachmentFiles.length; i++) {
          let imageUrl = "";
          imageUrl = "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[i].Id + '/' + attachmentFiles[i].Title;
          imageURLList.push({ imageUrl: imageUrl, IdeaID: attachmentFiles[i].IdeaID })
        }
        this.setState({ imageList: imageURLList });
        console.log("imageList", imageURLList);
      }
      else {
        this.setState({ imageList: [] });
      }

    }
    catch (ex) {
      this.errorLog(ex, "getAttachment", "getAttachment", "afk-drafts");
    }

  }
  getImageURL(ideaId: any) {
    const imageURLs: any = [];
    if (this.state.imageList.length > 0) {
      const filteredImages = this.state.imageList.filter((image: any) => parseInt(image.IdeaID) === ideaId);
      filteredImages.forEach((image: any) => {
        if (image.imageUrl) {
          imageURLs.push(image.imageUrl);
        }
      });
    }
    return imageURLs;
  }
  // public async getToken() {

  //   const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
  //   //let columnName = "InnovationID";
  //   // .filter(`${columnName} eq '${InnovationID}'`)
  //   const listItems: any = await web.lists.getByTitle("TokenDispenser")
  //     .items
  //     .get();
  //   // Assuming you want to store attachment file names in the state
  //   let tokenInfo = [];
  //   tokenInfo = listItems;
  //   console.log("tokenInfo", tokenInfo);
  //   if (tokenInfo.length > 0) {
  //     this.setState({ token: tokenInfo[0].Token })
  //     //this.myideas();
  //     console.log("Token - ", tokenInfo[0].Token);
  //   }
  // }

  //To get Draft list
  public myideas = async () => {
    try {
      this.setState({ isLoader: true, allDraftIdeaList: [] });
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
      console.log("getMyideas", user.userName)
      let params = {
        userid: user.prno,//user.userName,
        "ideaid": 0,
        "action": "DRAFT"
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

      let dataList: any = [];
      dataList = responseData.data;
      if (dataList.length > 0) {
        console.log("allDraftIdeaList", dataList);
        let newArray: any = [];
        let slicedArr: any;
        newArray = dataList.filter((dataList: any) => dataList.ideaowner == user.prno);
        slicedArr = newArray.slice(0, 5);
        this.setState({
          isLoader: false,
          allDraftIdeaList: slicedArr
          // filterName: action == "" ? "Recent" : action
        })
        console.log("State allDraftIdeaList", this.state.allDraftIdeaList);

      }
    }
    catch (ex) {
      this.errorLog(ex, "myideas", "myideas", "afk-drafts");
    }
  }

  // formatTimeElapsed = (timestamp: any) => {
  //   const commentDate: any = new Date(timestamp);
  //   const currentDate: any = new Date();

  //   const millisecondsPerSecond = 1000;
  //   const millisecondsPerMinute = millisecondsPerSecond * 60;
  //   const millisecondsPerHour = millisecondsPerMinute * 60;
  //   const millisecondsPerDay = millisecondsPerHour * 24;
  //   const millisecondsPerWeek = millisecondsPerDay * 7;
  //   const millisecondsPerMonth = millisecondsPerDay * 30.44; // Approximate days per month
  //   const millisecondsPerYear = millisecondsPerDay * 365;

  //   const elapsedMilliseconds = currentDate - commentDate;

  //   if (elapsedMilliseconds < millisecondsPerMinute) {
  //     return 'Just now';
  //   } else if (elapsedMilliseconds < millisecondsPerHour) {
  //     const minutes = Math.floor(elapsedMilliseconds / millisecondsPerMinute);
  //     return `${minutes}m ago`;
  //   } else if (elapsedMilliseconds < millisecondsPerDay) {
  //     const hours = Math.floor(elapsedMilliseconds / millisecondsPerHour);
  //     return `${hours}h ago`;
  //   } else if (elapsedMilliseconds < millisecondsPerWeek) {
  //     const days = Math.floor(elapsedMilliseconds / millisecondsPerDay);
  //     if (days === 1) {
  //       return '1d ago';
  //     } else {
  //       return `${days}d ago`;
  //     }
  //   } else if (elapsedMilliseconds < millisecondsPerMonth) {
  //     const weeks = Math.floor(elapsedMilliseconds / millisecondsPerWeek);
  //     if (weeks === 1) {
  //       return '1w ago';
  //     } else {
  //       return `${weeks}w ago`;
  //     }
  //   } else if (elapsedMilliseconds < millisecondsPerYear) {
  //     const months = Math.floor(elapsedMilliseconds / millisecondsPerMonth);
  //     if (months === 1) {
  //       return '1m ago';
  //     } else {
  //       return `${months}m ago`;
  //     }
  //   } else {
  //     const years = Math.floor(elapsedMilliseconds / millisecondsPerYear);
  //     if (years === 1) {
  //       return '1y ago';
  //     } else {
  //       return `${years}y ago`;
  //     }
  //   }
  // };

  // formatTimeElapsed = (timestamp: any) => {
  //   const commentDate: any = new Date(timestamp);
  //   const currentDate: any = new Date();

  //   const millisecondsPerSecond = 1000;
  //   const millisecondsPerMinute = millisecondsPerSecond * 60;
  //   const millisecondsPerHour = millisecondsPerMinute * 60;
  //   const millisecondsPerDay = millisecondsPerHour * 24;
  //   const millisecondsPerWeek = millisecondsPerDay * 7;
  //   const millisecondsPerMonth = millisecondsPerDay * 30.44; // Approximate days per month
  //   const millisecondsPerYear = millisecondsPerDay * 365;

  //   const elapsedMilliseconds = currentDate - commentDate;

  //   if (elapsedMilliseconds < millisecondsPerMinute) {
  //     return 'Just now';
  //   } else if (elapsedMilliseconds < millisecondsPerHour) {
  //     const minutes = Math.floor(elapsedMilliseconds / millisecondsPerMinute);
  //     return `${minutes}${this.state.minute} ${this.state.ago}`;
  //   } else if (elapsedMilliseconds < millisecondsPerDay) {
  //     const hours = Math.floor(elapsedMilliseconds / millisecondsPerHour);
  //     return `${hours}${this.state.hour} ${this.state.ago}`;
  //   } else if (elapsedMilliseconds < millisecondsPerWeek) {
  //     const days = Math.floor(elapsedMilliseconds / millisecondsPerDay);
  //     if (days === 1) {
  //       // return '1d ago';
  //       let oday = 1
  //       return `${oday}${this.state.day} ${this.state.ago}`;
  //     } else {
  //       return `${days}${this.state.day} ${this.state.ago}`;
  //     }
  //   } else if (elapsedMilliseconds < millisecondsPerMonth) {
  //     const weeks = Math.floor(elapsedMilliseconds / millisecondsPerWeek);
  //     if (weeks === 1) {
  //       // return '1w ago';
  //       let oweek = 1
  //       return `${oweek}${this.state.week} ${this.state.ago}`;
  //     } else {
  //       return `${weeks}${this.state.week} ${this.state.ago}`;
  //     }
  //   } else if (elapsedMilliseconds < millisecondsPerYear) {
  //     const months = Math.floor(elapsedMilliseconds / millisecondsPerMonth);
  //     if (months === 1) {
  //       // return '1m ago';
  //       let omon = 1
  //       return `${omon}${this.state.month} ${this.state.ago}`;
  //     } else {
  //       return `${months}${this.state.month} ${this.state.ago}`;
  //     }
  //   } else {
  //     const years = Math.floor(elapsedMilliseconds / millisecondsPerYear);
  //     if (years === 1) {
  //       // return '1y ago';
  //       let oyear = 1
  //       return `${oyear}${this.state.year} ${this.state.ago}`;
  //     } else {
  //       return `${years}${this.state.year} ${this.state.ago}`;
  //     }
  //   }
  // };

  formatTimeElapsed = (timestamp: any) => {
    const commentDate: any = new Date(timestamp);
    const currentDate: any = new Date();

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerWeek = millisecondsPerDay * 7;
    const millisecondsPerMonth = millisecondsPerDay * 30.44; // Approximate days per month
    const millisecondsPerYear = millisecondsPerDay * 365;

    const elapsedMilliseconds = currentDate - commentDate;

    if (elapsedMilliseconds < millisecondsPerMinute) {
      return 'Just now';
    } else if (elapsedMilliseconds < millisecondsPerHour) {
      const minutes = Math.floor(elapsedMilliseconds / millisecondsPerMinute);
      return `${minutes}${this.state.minute} ${this.state.ago}`;
    } else if (elapsedMilliseconds < millisecondsPerDay) {
      const hours = Math.floor(elapsedMilliseconds / millisecondsPerHour);
      return `${hours}${this.state.hour} ${this.state.ago}`;
    } else if (elapsedMilliseconds < millisecondsPerWeek) {
      const days = Math.floor(elapsedMilliseconds / millisecondsPerDay);
      if (days === 1) {
        // return '1d ago';
        let oday = 1
        return `${oday}${this.state.day} ${this.state.ago}`;
      } else {
        return `${days}${this.state.day} ${this.state.ago}`;
      }
    } else if (elapsedMilliseconds < millisecondsPerMonth) {
      const weeks = Math.floor(elapsedMilliseconds / millisecondsPerWeek);
      if (weeks === 1) {
        // return '1w ago';
        let oweek = 1
        return `${oweek}${this.state.week} ${this.state.ago}`;
      } else {
        return `${weeks}${this.state.week} ${this.state.ago}`;
      }
    } else if (elapsedMilliseconds < millisecondsPerYear) {
      const months = Math.floor(elapsedMilliseconds / millisecondsPerMonth);
      if (months === 1) {
        // return '1m ago';
        let omon = 1
        return `${omon}${this.state.month} ${this.state.ago}`;
      } else {
        return `${months}${this.state.month} ${this.state.ago}`;
      }
    } else {
      const years = Math.floor(elapsedMilliseconds / millisecondsPerYear);
      if (years === 1) {
        // return '1y ago';
        let oyear = 1
        return `${oyear}${this.state.year} ${this.state.ago}`;
      } else {
        return `${years}${this.state.year} ${this.state.ago}`;
      }
    }
  };

  redirectInnerPage(id: any) {
    console.log(id)
    window.location.replace("https://dewa.sharepoint.com.mcas.ms/sites/qaideation/SitePages/ShareyourIdeaRevise.aspx?ideaID=" + id);
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
  // private deleteDraft = async (ideaid: number) => {
  //   console.log("Clicked delete icon for idea ID:", ideaid);
  //   try {
  //     let struser: any = localStorage.getItem('userinfo');
  //     let user = JSON.parse(struser);
  //     let jtv: any = localStorage.getItem("Jtv");
  //     let jtvparse = JSON.parse(jtv);

  //     let params = {
  //       userid: user.prno,
  //       ideaid: ideaid,
  //       Action:"Delete"
  //     };

  //     const sK0y = this.state.sK0y;
  //     const jString = JSON.stringify(params);
  //     const hmacValue = this.generateHMAC(jString, sK0y);

  //     let headers: any;
  //     if (this.state.isHMAC == "Enable") {
  //       headers = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //           'hmac-base64': hmacValue,
  //           'Authorization': `Bearer ${this.state.token}`,
  //           'x-jwt-token': jtvparse.Jtv
  //         }
  //       };
  //     } else {
  //       headers = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json'
  //         }
  //       };
  //     }

  //     await this.IdeationServices.postData(params, headers, "myideas");
  //     this.myideas(); 
  //   } catch (error) {
  //     console.error("Delete failed", error);
  //     this.errorLog(error, "deleteDraft", "deleteDraft", "afk-drafts");
  //   }
  // };

  public deleteDraftConfirm = (ideaId: number) => {
    console.log("Clicked delete icon for idea ID:", ideaId);

    this.setState({ isdraftopopup: true, myideaid: ideaId });// Open the delete confirmation popup
  };
  public deleteDraft = async (ideaId: number) => {
    try {
      this.setState({ isLoader: true });

      const user = JSON.parse(localStorage.getItem("userinfo") || "{}");
      const jtv = JSON.parse(localStorage.getItem("Jtv") || "{}");

      const params = {
        ideaid: ideaId,
        ideaowner: user.prno,
        Action: "Delete",
        languagecode: this.langCode
      };

      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);

      const headers = this.state.isHMAC === "Enable"
        ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "hmac-base64": hmacValue,
            Authorization: `Bearer ${this.state.token}`,
            "x-jwt-token": jtv.Jtv
          }
        }
        : {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        };

      const response = await this.IdeationServices.postData(params, headers, "submitidea");
      console.log("Sending DELETE request to submitidea", params, headers);

      if (response?.data?.responseCode > 0) {

        this.setState(prevState => ({
          allDraftIdeaList: prevState.allDraftIdeaList.filter(
            (idea: any) => parseInt(idea.ideaid) !== parseInt(ideaId.toString())
          ),
          isLoader: false
        }));
        console.log("Draft deleted successfully");
        this.myideas();
      } else {
        console.error("Failed to delete draft:", response?.data?.message || "Unknown error");
        this.setState({ isLoader: false, isdraftopopup: false });
      }
    } catch (error) {
      console.error("Delete Draft Error:", error);
      this.setState({ isLoader: false });
    }
  };
  public render(): React.ReactElement<IAfkDraftsProps> {
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;

    return (
      <div className="col-lg-12 afk-drafts">
        <div className={this.state.class}>
          {console.log("allideaList", this.state.allDraftIdeaList)}
          {this.state.allDraftIdeaList.length > 0 && (
            <div className="row">
              <div className="col-lg-12 back-heading head-navlink">
                <h2 className="back-heading ms-3 float-start">
                  {langText.drafts} ({this.state.allDraftIdeaList.length})
                </h2>
              </div>
            </div>
          )}

          {this.state.allDraftIdeaList.map((item: any) => (
            <div className="row mt-4" key={item.ideaid}>
              <div className="col-lg-12 position-relative">
                <div className="h-border-box-fill">
                  <div className="col-lg-12 p-0">
                    <div className="col-lg-12 p-0 cursor-pointer" onClick={() => this.redirectInnerPage(item.ideaid)}>
                      <div className="d-flex">
                        <div className="flex-grow-1 me-2">
                          <div className="col-lg-12 p-0">
                            <p className="h-lh-text-n">{item.ideatitle}</p>
                            <p className="h-lh-text-n-date dfts-dt">
                              {this.formatTimeElapsed(item.enteredon)}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0 position-relative">

                          {this.getImageURL(item.ideaid).map((imageURL: any, index: number) => (
                            <img
                              key={index}
                              src={imageURL}
                              alt={`Image ${index + 1}`}
                              className="hnews-img"
                            />
                          ))}
                          <div className="position-absolute top-0 end-0 mt-2 me-3"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteDraftModal"
                            onClick={(e) => {
                              e.stopPropagation();
                              this.deleteDraftConfirm(item.ideaid); // call delete
                            }}
                          >
                            <button
                              type="button"
                              className="btn btn-link p-0 m-0"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteDraftModal"
                              style={{ boxShadow: "none" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                this.deleteDraftConfirm(item.ideaid); // call delete
                              }}
                            >
                              <img
                                src={Deletetrash}
                                alt="Delete"
                                title="Delete Draft"
                                style={{ width: '24px', height: '24px' }}
                                data-bs-toggle="modal"
                                data-bs-target="#deleteDraftModal"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <Dialog
            hidden={!this.state.isdraftopopup}
            onDismiss={this.closestage1CommentReportDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: "Delete Draft",
              className: 'ebtdialogsmallic'
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
              <DefaultButton className="btn-clear" onClick={() => this.closestage1CommentReportDialog()} text={langText.cancel} />
              <DefaultButton className="btn-approve" onClick={() =>  this.deleteDraft(this.state.myideaid)} text={langText.delete} />
            </DialogFooter>
          </Dialog> */}
  
          <div
            className="modal fade"
            id="deleteDraftModal"
            aria-labelledby="deleteDraftModal"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-90w">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-3">
                      <img
                        src={MIe02}
                        className="mins-icon"
                        alt="edit-icon"
                        width="48"
                        height="48"
                      />
                    </div>
                    <div className="col-lg-12">
                      <h1 className="moheading01">{langText.deletedraft}</h1>
                      <p className="motext01">
                        {langText.areyousureyouwanttodeletethisdraft}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary m-btn"
                    data-bs-dismiss="modal"
                  >
                    {" "}
                    {langText.cancel}
                  </button>
                  <button
                    type="button"
                    id='Cancel Challenges/opportunities'
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.deleteDraft(this.state.myideaid); // call delete
                    }}
                    className="btn btn-danger m-btn"
                  >
                    {langText.delete}
                  </button>
                </div>
              </div>
            </div>
          </div>

        
      </div>
    );
  }
}
