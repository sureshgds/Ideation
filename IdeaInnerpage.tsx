import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import type { IAfkIdeainnerpageProps } from './IAfkIdeainnerpageProps';
import Globeicon from "./../assets/img/svg/globe-icon.png";
//import Timeicon from "./../assets/img/svg/time-icon.png";
import Infocircle from "./../assets/img/svg/info-circle-black-icon.png";
import Voteicon from "./../assets/img/svg/vote-icon.png";
import Replyellipsesicon from "./../assets/img/svg/ellipses-reply.png";
import Bookmarkiconwhite from "./../assets/img/svg/bookmark-icon-filled-white.png";
import ReactTooltip from 'react-tooltip';
import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
import Backarrow from "./../assets/img/svg/back-arrow.png";
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
import { IAfkIdeainnerpageStates } from './IAfkIdeainnerpageStates';
import { Web } from 'sp-pnp-js';
import Commentreplyicon from "./../assets/img/svg/comment-reply-icon.png";
import { TextField } from '@fluentui/react';
import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';
import deletecomment from "./../assets/img/svg/comment-delete.png";
import editcomment from "./../assets/img/svg/comment-edit.png";
import reportcomment from "./../assets/img/svg/edit-icon-fill.png";
import Shareicon from "./../assets/img/svg/share-icon.png";
// import Playicon from "./../assets/img/svg/play-white-icon.png";
//  import Playicon from "./../assets/img/svg/play-white-icon.png";
import Sharecopylinkicon from "./../assets/img/svg/share-copylink-icon.png";
import Sharesenddirectlinkicon from "./../assets/img/svg/share-send-directlink-icon.png";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
} from "@fluentui/react";
import * as CryptoJS from 'crypto-js';
import DummyProfileimg from "./../assets/img/profile-img13.jpg";
import hbanner10 from "./../assets/img/hbanner10.png";
import ReactPlayer from 'react-player';
import Downloadicon from "./../assets/img/svg/download-icon.png";
interface profileAttachment {
  imageUrl: string;
  IdeaID: number;
}

interface Attachment {
  imageUrl: string;
  IdeaID: number;
  pdfUrl: string;
  videoUrl: string;
}
interface userDesignation {
  designation: string;
  Ideaowner: number;
  name: string;
  arname: string;

}

interface approverrole {
  approverrole: any;
  Id: any;
  approverrole1: any;
}

const GROUP_NAME = "Ideation Admin";


export default class AfkIdeainnerpage extends React.Component<IAfkIdeainnerpageProps, IAfkIdeainnerpageStates, {}> {
  //private currentCommentId: number = 0;

  private IdeationServices: IdeationAPIServices;
  public ideaID: any;
  userImageUrl: any;
  loggedInUser: any;
  globalClass = "global-en";
  langCode: any = 1033;
  //private currentCommentId: number = 0;
  constructor(props: IAfkIdeainnerpageProps, state: IAfkIdeainnerpageStates) {
    super(props);

    this.IdeationServices = new IdeationAPIServices();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.ideaID = params.get('ideaID');
    this.state = {
      isSuccess: false,
      isReadMore: false,
      isLoader: false,
      isDialogVisible: "",
      isSuccessDialogVisible: "",
      errorDesciption: "",
      errorTitle: "",
      successMessageDesciption: "",
      successMessageTitle: "",
      ideaTitle: "",
      submitterEmailID: "",
      submitterUserName: "",
      bookMarkClass: "modal fade",
      bookMarkDesc: "Added to your Bookmarks",
      isBookmarkModalOpen: false,
      files: [],
      ideaDesc: '',
      enteredon: '',
      status: '',
      voteCnt: '',
      commentCnt: '',
      sharesCnt: '',
      benefit: '',
      ideapath: '',
      imageList: [],
      IdeaTrackingList: [],
      commentList: [],
      comment: '',
      editID: '',
      ideaID: '',
      isReplyCommentShow: false,
      replyComment: '',
      replyCommentList: [],
      cntcomment: 0,
      cntvote: 0,
      cntshare: 0,
      reportIdeaId: 0,
      reportCommentId: 0,
      stage1CommentReportDialog: false,
      stage2CommentReportDialog: false,
      reportRepliesId: 0,
      editComment: '',
      isReplyShowtextBox: false,
      isReply2ShowtextBox: false,
      ReplyCommenteditID: 0,
      editReplyComment: '',
      ideaReply2CommentId: 0,
      CommentReplyId: 0,
      isShowCreateCampaign: false,
      profileAttachments: {},
      uniqueIds: [],
      sK0y: "",
      isHMAC: "",
      token: "",
      submitterEmailId: '',
      lang: "en",
      class: "ideainnerpage-en",
      modalClass: "modal fade",
      reportthiscomment: "",
      englishContent: "",
      arabicContent: "",
      userbookmark: "",
      addedtoyourbookmarks: "Added to your bookmarks",
      bookmarksremoved: "Removed from your bookmarks",
      designationList: {},
      approverroleList: {},
      isInGroup: false,
      error: '',
      division: '',
      ideatype: '',
      value_chain: '',
      innovationenablers: ''
    }
    //this.fetchapproverole('Targetdivisionchampion');
  }
  public submitBookmark = async (ideaId: any, isLike: any, isDisLike: any, isBookmark: any) => {
    this.setState({ isBookmarkModalOpen: true });
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);

    let params = {
      ideaid: ideaId,
      userid: user.prno,
      idealike: isLike,
      ideadislike: isDisLike,
      suggestions: "",
      shareidea: "0",
      bookmark: isBookmark,
      submitteremailid: user.prno,
      submitterusername: user.prno
    };

    const sK0y = this.state.sK0y;
    const jString = JSON.stringify(params);
    const hmacValue = this.generateHMAC(jString, sK0y);

    let jtv: any = localStorage.getItem("Jtv");
    let jtvparse = JSON.parse(jtv);
    let headers: any;

    if (this.state.isHMAC == "Enable") {
      headers = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'hmac-base64': hmacValue,
          'Authorization': `Bearer ${this.state.token}`,
          'x-jwt-token': jtvparse.Jtv
        }
      };
    } else {
      headers = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
    }

    let apiResponse: any = await this.IdeationServices.postData(params, headers, "SubmitVote");

    if (apiResponse && apiResponse.data && apiResponse.data.data.respcode > 0) {


      if (isBookmark == 0) {
        this.setState({
          bookMarkClass: "modal fade show",
          bookMarkDesc: this.state.bookmarksremoved,
          userbookmark: "0"
        });
        this.setState({ modalClass: 'modal fade e-backdrop' });
      } else if (isBookmark == 1) {
        this.setState({
          bookMarkClass: "modal fade show",
          bookMarkDesc: this.state.addedtoyourbookmarks,
          userbookmark: "1"
        });
        this.setState({ modalClass: 'modal fade e-backdrop' });
      }

      // setTimeout(() => {
      //   this.setState({ bookMarkClass: "model in", bookMarkDesc: "" });
      //   let bookmarkmodal = document.getElementById("Bookmarkmodal");
      //   if (bookmarkmodal) {
      //     bookmarkmodal.setAttribute("style", "display:none");
      //   }
      // }, 3000);
    }
  }
  private handleReadMoreClick = () => {
    this.setState({ isReadMore: !this.state.isReadMore });
  }
  private async checkGroupMembership(): Promise<void> {
    const { spHttpClient, siteUrl, currentUserLoginName } = this.props;

    const endpoint = `${siteUrl}/_api/web/sitegroups/getbyname('${GROUP_NAME}')/users`;

    try {
      const response = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      const data = await response.json();
      console.log(data);
      const isUserInGroup = data.value.some((user: any) =>
        user.Email.toLowerCase() === currentUserLoginName.toLowerCase()
      );

      this.setState({ isInGroup: isUserInGroup });
    } catch (error) {
      console.error("Error checking group membership:", error);
      this.setState({ error: "Could not check group membership", isInGroup: false });
    }
  }

  public async fetchapproverole(role: any, trackingid: any) {

    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");

    const listItems: any = await web.lists.getByTitle("ApproverRole")
      .items
      .filter(`Title eq '${role}'`)
      .expand(`AttachmentFiles`)
      .get();
    console.log(listItems);
    let attachmentFiles = [];
    attachmentFiles = listItems;
    // if (attachmentFiles.length > 0) {
    //   let attachmentPath = "Lists/" + "ProfilePicture/" + "Attachments/";
    //   this.userImageUrl = "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[0].Id + '/' + attachmentFiles[0].Title;

    // }
    // else {
    //   this.userImageUrl = "";
    // }
    console.log(attachmentFiles);
    console.log("attachmentFiles", attachmentFiles);
    let List: any;
    List = [];
    // List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
    if (this.state.lang == 'en') {
      List.push({ Id: trackingid, approverrole: attachmentFiles[0].Name, approverrole1: attachmentFiles[0].Approver })
    }
    if (this.state.lang == 'ar') {
      List.push({ Ideaowner: trackingid, approverrole: attachmentFiles[0].NameAR, approverrole1: attachmentFiles[0].Approver })
    }
    //this.setState({ designationList: List });
    this.setState((prevState => ({
      approverroleList: {
        ...prevState.approverroleList,
        [trackingid]: List
      }
    })));
    console.log(this.state.approverroleList);
  }

  public async getMyIdea() {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let params = {
        UserId: user.prno,//user.userName,
        ideaid: this.ideaID,
        action: "GETIDEABYID"
      }


      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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
      this.setState(
        {
          ideaTitle: responseData.data[0].ideatitle,
          ideaDesc: responseData.data[0].ideadescr,
          enteredon: responseData.data[0].enteredon,
          status: responseData.data[0].ideastatus,
          benefit: responseData.data[0].benefit,
          ideapath: responseData.data[0].ideapath,
          submitterEmailID: responseData.data[0].submitteremailid,
          submitterUserName: responseData.data[0].submittername,
          cntcomment: responseData.data[0].cntcomment,
          cntvote: responseData.data[0].cntvote,
          cntshare: responseData.data[0].cntshare,
          isLoader: false,
          submitterEmailId: responseData.data[0].submitteremailid,

          division: responseData.data[0].division.replace(/amp;/g, ""),
          ideatype: responseData.data[0].ideatype,
          value_chain: responseData.data[0].value_chain,
          innovationenablers: responseData.data[0].innovationenablers,

        }
      );
      if (responseData.data[0].ideaowner == user.prno) {
        this.setState({ isShowCreateCampaign: true });
        console.log('Your email ID exists in the list.');
      } else {
        this.setState({ isShowCreateCampaign: false });
        console.log('Your email ID does not exist in the list.');
      }
      console.log(this.state.submitterEmailId);
      console.log(this.loggedInUser);

    }

    catch (ex) {
      this.errorLog(ex, "myideas", "getMyIdea", "afk-ideainnerpage");
    }

  }

  fetchapproveroleTracking = async (type: any) => {

    if (type == 'tracking') {
      for (const idea of this.state.IdeaTrackingList) {
        console.log(idea);
        await this.fetchapproverole(idea.approverrole, idea.approvalid);
      }
    }
  };

  fetchDesignationForAllIdeas = async (type: any) => {
    if (type == 'comments') {
      for (const idea of this.state.commentList) {
        console.log(idea);
        await this.getEmployeeDetailsComments(idea.enteredby);
      }
    }
    if (type == 'tracking') {
      for (const idea of this.state.IdeaTrackingList) {
        console.log(idea);
        await this.getEmployeeDetails(idea.submitteremailid);
      }
    }
  };

  //To call getmyidea
  public async getEmployeeDetailsComments(prno: any) {
    // try {
    let apiResponse: any;
    let responseData: any = [];
    // let struser: any = localStorage.getItem('userinfo');
    // let user = JSON.parse(struser);
    let params =
    {
      employeenumber: prno,
      division: "10003806",
      usertype: "",
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
    apiResponse = await this.IdeationServices.postDataEmployeeDEtails(params, headers, "employeedetails");
    responseData = apiResponse.data.empdetails[0];
    console.log(apiResponse);
    console.log("employeedetails", responseData);
    let List: any;
    let designation = responseData.jobtitle;
    let nameEn = responseData.name;
    let namear = responseData.fullnameinArabic;
    console.log("designation", designation, prno);
    List = [];
    // List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
    if (this.state.lang == 'en') {
      List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
    }
    if (this.state.lang == 'ar') {
      List.push({ Ideaowner: prno, designation: responseData.jobtitleinArabic, name: namear, arname: namear })
    }
    //this.setState({ designationList: List });
    this.setState((prevState => ({
      designationList: {
        ...prevState.designationList,
        [prno]: List
      }
    })));
    console.log(this.state.designationList);
    // this.setState({
    //   submitterEmailID: responseData.emailid,
    //   submitterUserName: responseData.name,
    // });
    console.log(this.state.submitterEmailID, this.state.submitterUserName);
    // }
    // catch (ex) {
    //   this.errorLog(ex, "employeedetails", "getEmployeeDetails", "afk-appealapproval");
    // }
  }



  public async componentDidMount() {
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    this.loggedInUser = user.userEmailID;

    if (this.ideaID != null) {
      await this.getHMACENABLEorDISABLE();
      await this.getToken();
      this.fetchJsonFile('ar.json');
      this.fetchJsonFile('en.json');
      this.changeLanguage();

      this.setState({
        ideaID: this.ideaID,
        userbookmark: "0", // you can replace this with actual value if you fetch
      });
    } else {
      this.setState({ isLoader: true });
    }

    this.checkGroupMembership();
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

  // To get Token
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
      this.errorLog(ex, "getToken", "getToken", "afk-ideainnerpage");
    }

  }

  // To configure HMAC
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
      this.errorLog(ex, "getHMACENABLEorDISABLE", "getHMACENABLEorDISABLE", "afk-ideainnerpage");
    }

  };
  generateHMAC(message: any, sKey: any) {
    return CryptoJS.HmacSHA256(message, sKey).toString(CryptoJS.enc.Base64);
  }

  public formatDate(dateString: any) {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const formattedDate = monthNames[monthIndex] + ' ' + ('0' + day).slice(-2);

    return formattedDate;
  }

  public getYearFromDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    return year;
  }

  // To get imageList
  public async getAttachment() {
    try {
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
      //let columnName = "InnovationID";
      // .filter(`${columnName} eq '${InnovationID}'`)
      const listItems: any = await web.lists.getByTitle("IdeaAttachments")
        .items
        .filter(`IdeaID eq '${this.ideaID}'`)
        .expand(`AttachmentFiles`)
        .get();
      // Assuming you want to store attachment file names in the state
      let attachmentFiles = [];
      let imageURLList: any = [];
      attachmentFiles = listItems;
      console.log("attachmentFileNames", attachmentFiles);
      if (attachmentFiles.length > 0) {
        let attachmentPath = "Lists/" + "IdeaAttachments" + "/Attachments/";
        for (let i = 0; i < attachmentFiles.length; i++) {
          // let imageUrl = "";
          // imageUrl = "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[i].Id + '/' + attachmentFiles[i].Title;
          // imageURLList.push({ imageUrl: imageUrl, IdeaID: attachmentFiles[i].IdeaID })
          if (attachmentFiles[i].Title.includes('jpg') ||
            attachmentFiles[i].Title.includes('jpeg') ||
            attachmentFiles[i].Title.includes('png')) {
            imageURLList = [{
              imageUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${attachmentFiles[i].Id}/${attachmentFiles[i].Title}`,
              IdeaID: this.ideaID,
              pdfUrl: '',
              videoUrl: ''
            }]
          }
          else if (attachmentFiles[i].Title.includes('pdf')) {
            imageURLList = [{
              imageUrl: `${hbanner10}`,
              IdeaID: this.ideaID,
              pdfUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${attachmentFiles[i].Id}/${attachmentFiles[i].Title}`,
              videoUrl: ''
            }]
          }
          else if (attachmentFiles[i].Title.includes('mp4') ||
            attachmentFiles[i].Title.includes('mov')
          ) {
            imageURLList = [{
              imageUrl: '',
              IdeaID: this.ideaID,
              pdfUrl: '',
              videoUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${attachmentFiles[i].Id}/${attachmentFiles[i].Title}`
            }]
          }
        }

        console.log("imageList", this.state.imageList);
      }
      else {
        imageURLList = [{
          imageUrl: `${hbanner10}`,
          pdfUrl: '',
          videoUrl: '',
          IdeaID: this.ideaID
        }]
      }
      this.setState({ imageList: imageURLList });
    }
    catch (ex) {
      this.errorLog(ex, "getAttachment", "getAttachment", "afk-ideainnerpage");
    }

  }

  // To get image URLs
  getImageURL(ideaId: any) {
    try {
      const imageURLs: any = [];
      if (this.state.imageList.length > 0) {
        const filteredImages = this.state.imageList.filter((image: any) => parseInt(image.IdeaID) === ideaId);
        filteredImages.forEach((image: any) => {
          if (image.imageUrl) {
            imageURLs.push(image.imageUrl);
          }
        });
      }
      console.log("imageURLs", imageURLs)
      return imageURLs;
    }
    catch (ex) {
      this.errorLog(ex, "getImageURL", "getImageURL", "afk-ideainnerpage");
    }

  }

  // To get ProfilePicture
  public async getUserAttachment() {
    try {
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
      //let columnName = "InnovationID";
      // .filter(`${columnName} eq '${InnovationID}'`)
      const listItems: any = await web.lists.getByTitle("ProfilePicture")
        .items
        .filter(`EmailID eq '${user.prno}'`)
        .expand(`AttachmentFiles`)
        .get();
      console.log(listItems);
      if (listItems.length > 0) {
        let attachmentFiles = [];
        attachmentFiles = listItems;
        let attachmentPath = "Lists/" + "ProfilePicture/" + "Attachments/";
        this.userImageUrl = "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[0].Id + '/' + attachmentFiles[0].Title;
      }
      else {
        this.userImageUrl = '';
      }
      console.log(this.userImageUrl);
    }
    catch (ex) {
      this.errorLog(ex, "getUserAttachment", "getUserAttachment", "afk-ideainnerpage");
    }

  }
  fetchAttachmentsForAllProfile = async (uniqueIds: any) => {
    for (const Innovators of uniqueIds) {
      await this.fetchAttachmentsForProfile(Innovators);
    }
  };

  // To fetch Attachments For Profile
  fetchAttachmentsForProfile = async (EmailID: any) => {
    try {
      try {
        const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
        let allItems: any[] = [];
        let nextLink: string | null = null;

        const fetchItems = async (url: string) => {
          const response: any = await web.lists.getByTitle("ProfilePicture")
            .items
            .filter(`EmailID eq '${EmailID}'`) //EmailID
            .expand('AttachmentFiles')
            .top(100)
            .getPaged();
          console.log("profile Response", response);
          allItems = allItems.concat(response.results);
          nextLink = response.hasNext ? response.getNext() : null;

          if (nextLink) {
            await fetchItems(nextLink);
          }
        };

        await fetchItems(`https://dewa.sharepoint.com/sites/qaideation/_api/web/lists/getByTitle('ProfilePicture')/items?$filter=EmailID eq ${EmailID}&$expand=AttachmentFiles`);

        let attachmentFiles = allItems;
        let imageURLList: any = [];
        if (attachmentFiles.length > 0) {
          let attachmentPath = "Lists/ProfilePicture/Attachments/";
          imageURLList = attachmentFiles.map(item => ({
            imageUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${item.Id}/${item.Title}`,
            EmailID: item.EmailID
          }));
        }
        else {
          imageURLList = [{ imageUrl: `${DummyProfileimg}`, EmailID: EmailID }]
        }

        this.setState((prevState => ({
          profileAttachments: {
            ...prevState.profileAttachments,
            [EmailID]: imageURLList
          }
        })));
        console.log(this.state.profileAttachments);
      } catch (error) {
        console.error(`Error fetching attachments for profile ${EmailID}:`, error);
      }
    }
    catch (ex) {
      this.errorLog(ex, "fetchAttachmentsForProfile", "fetchAttachmentsForProfile", "afk-ideainnerpage");
    }

  };

  public getIdeaApproval = async () => {
    try {
      this.setState({ IdeaTrackingList: [] });
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let params = {
        "ideaid": this.ideaID,
        userID: user.prno,//user.userName,
        "action": "GETIDEABYID"
      }
      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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

      let dataList: any = [];
      dataList = responseData.data;
      if (dataList.length > 0) {
        console.log("IdeaTrackingList", dataList);

        this.setState({
          isLoader: false,
          IdeaTrackingList: dataList
        }, () => {
          let uniqueIds = dataList.reduce((acc: any, current: any) => {
            if (!acc.includes(current.submitteremailid)) {
              acc.push(current.submitteremailid);
            }
            return acc;
          }, []);
          this.setState({ uniqueIds: uniqueIds });
          this.fetchAttachmentsForAllProfile(uniqueIds);
          this.fetchDesignationForAllIdeas('tracking');
          this.fetchapproveroleTracking('tracking');
        });
        console.log("State IdeaTrackingList", this.state.IdeaTrackingList);

      }
    }
    catch (ex) {
      this.errorLog(ex, "getIdeaApproval", "getIdeaApproval", "afk-ideainnerpage");
    }
  }

  // To get idea comments list
  public getIdeaComment = async (ideaId: any) => {
    try {
      //this.currentCommentId = ideaId;
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      console.log("getMyChallenge", user.userName)
      let params = {
        userid: user.prno,
        IDEAID: ideaId
      };

      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
      if (this.state.isHMAC === "Enable") {
        headers = {
          'headers': {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'hmac-base64': hmacValue,
            'Authorization': `Bearer ${this.state.token}`,
            'x-jwt-token': jtvparse.Jtv
          }
        };
      } else {
        headers = {
          'headers': {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        };
      }
      apiResponse = await this.IdeationServices.getData(params, headers, "getIdeaComments");
      responseData = apiResponse.data;

      let dataList: any = [];
      dataList = responseData.data;

      if (dataList.length > 0) {
        console.log("Fetched Comments", dataList);

        // Filter comments: Show only those raised by the user or all if admin
        //const filteredComments = dataList.filter((comment: any) => {
        // return comment.submitteremailid === user.prno;
        //  });

        // Update state with filtered comments
        // this.setState({ commentList: filteredComments });
        this.setState({ commentList: dataList });
        console.log("Filtered Comments", this.state.commentList);

        // Fetch additional designations for comments if required
        this.fetchDesignationForAllIdeas('comments');
      }
    } catch (ex) {
      this.errorLog(ex, "getIdeaComments", "getIdeaComment", "afk-ideainnerpage");
    }
  };

  public async getEmployeeDetails(prno: any) {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let params =
      {
        employeenumber: prno,
        "division": "",
        "usertype": "",
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
            'Authorization': `Bearer ${this.state.token}`,
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
      console.log(apiResponse);
      console.log("employeedetails", responseData);
      //return responseData.jobtitle;
      let List: any;
      let designation = responseData.jobtitle;
      let nameEn = responseData.name;
      let namear = responseData.fullnameinArabic;
      console.log("designation", designation, prno);


      List = [];
      // List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
      if (this.state.lang == 'en') {
        List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
      }
      if (this.state.lang == 'ar') {
        List.push({ Ideaowner: prno, designation: responseData.jobtitleinArabic, name: namear, arname: namear })
      }
      //this.setState({ designationList: List });
      this.setState((prevState => ({
        designationList: {
          ...prevState.designationList,
          [prno]: List
        }
      })));
      console.log(this.state.designationList);
      // this.setState({ imageList: [] });
    }
    catch (ex) {
      console.log(ex);
    }
  }

  // To get comment list
  public getIdeaReplyComment = async (commentId: any) => {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      console.log("getMyChallenge", user.userName)
      let params = {
        userid: user.prno,//user.userName,
        commentid: commentId
      }
      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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
      apiResponse = await this.IdeationServices.getData(params, headers, "getrepliesforcomment");
      responseData = apiResponse.data;

      let dataList: any = [];
      dataList = responseData.data;
      this.setState({ replyCommentList: dataList })
      if (dataList.length > 0) {
        console.log("commentList", dataList);
        this.setState({ replyCommentList: dataList })
      }
    }
    catch (ex) {
      this.errorLog(ex, "getrepliesforcomment", "getIdeaReplyComment", "afk-ideainnerpage");
    }


  }

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
      return `${minutes}m ago`;
    } else if (elapsedMilliseconds < millisecondsPerDay) {
      const hours = Math.floor(elapsedMilliseconds / millisecondsPerHour);
      return `${hours}h ago`;
    } else if (elapsedMilliseconds < millisecondsPerWeek) {
      const days = Math.floor(elapsedMilliseconds / millisecondsPerDay);
      if (days === 1) {
        return '1d ago';
      } else {
        return `${days}d ago`;
      }
    } else if (elapsedMilliseconds < millisecondsPerMonth) {
      const weeks = Math.floor(elapsedMilliseconds / millisecondsPerWeek);
      if (weeks === 1) {
        return '1w ago';
      } else {
        return `${weeks}w ago`;
      }
    } else if (elapsedMilliseconds < millisecondsPerYear) {
      const months = Math.floor(elapsedMilliseconds / millisecondsPerMonth);
      if (months === 1) {
        return '1m ago';
      } else {
        return `${months}m ago`;
      }
    } else {
      const years = Math.floor(elapsedMilliseconds / millisecondsPerYear);
      if (years === 1) {
        return '1y ago';
      } else {
        return `${years}y ago`;
      }
    }
  };


  // To submit Idea Comments
  public submitComment = async (ideaId: any, commentID: any = 0, action: any = "ADD", ideaOwner: any = "", ideaTitle: any = "") => {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let commentToSave: any;
      // commentID = this.state.editID == 0 ? commentID : this.state.editID;
      // if(action != "ADD"){
      //   action = this.state.editID == 0 ? action : "UPDATE";
      // }

      commentToSave = commentID == 0 ? this.state.comment : this.state.editComment;
      let params = {
        userid: user.prno,
        IDEAID: ideaId,
        cOMMENTS: commentToSave,//this.state.comment,
        COMMENTID: commentID,
        submitteremailid: user.prno,
        submitterusername: user.prno,
        ACTION: action
      }
      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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
      apiResponse = await this.IdeationServices.postData(params, headers, "submitIdeaComment");
      responseData = apiResponse.data;
      if (responseData.data.respcode > 0) {
        if (action == "ADD") {
          this.insertNotification("Commented on your idea - " + ideaTitle, "Comment", ideaId, ideaOwner, "Home");
        }
        if (action == "UPDATE") {
          this.setState(prevState => ({
            isReplyShowtextBox: {
              ...prevState.isReplyShowtextBox,
              [commentID]: !prevState.isReplyShowtextBox[commentID]
            },
            //editComment:editComment
          }));
        }
        console.log("submitIdeaComment Res", responseData.data);
        this.setState({
          comment: ""
        });
        // this.getIdeaComment(ideaId);
        await this.getIdeaComment(ideaId);


      }

    }
    catch (ex) {
      this.errorLog(ex, "submitIdeaComment", "submitComment", "afk-ideainnerpage");
    }

  }

  public insertNotification = async (notificationTitle: any, status: any, ideaId: any, ideaOwner: any, pageAction: any) => {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
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
        isread: 0
      }
      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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
    catch (ex) {
      this.errorLog(ex, "insertafkarinotification", "insertNotification", "afk-ideainnerpage");
    }

  }

  // submit Vote For Idea Comment
  public submitVoteForComment = async (ideaId: any, commentId: any, isLike: string) => {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let params = {
        IDEACOMMENTID: commentId,
        IDEAID: ideaId,
        userid: user.prno,//user.userName,
        isLike: isLike,
        submitteremailid: user.prno,//user.userEmailID,
        submittername: user.prno,//user.userName,
      }
      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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
      apiResponse = await this.IdeationServices.postData(params, headers, "SUBMITIDEAVOTEFORCOMMENT");
      responseData = apiResponse.data;
      if (responseData.data.respcode > 0) {
        console.log("SUBMITIDEAVOTEFORCOMMENT Res", responseData.data);
        this.getIdeaComment(ideaId);
      }

    }
    catch (ex) {
      this.errorLog(ex, "SUBMITIDEAVOTEFORCOMMENT", "submitVoteForComment", "afk-ideainnerpage");
    }

  }

  public onChangeComment(e: any, selctedOptions: any) {
    this.setState({
      comment: selctedOptions
    });
  }

  public handleKeyPress = (e: any, ideaID: any) => {
    try {
      if (e.key === 'Enter') {
        if (this.state.comment == "") {
          return false;
        }
        this.submitComment(ideaID);
      }
    }
    catch (ex) {
      this.errorLog(ex, "handleKeyPress", "handleKeyPress", "afk-ideainnerpage");
    }

  }

  // To shoe toggle for Comment
  public toggleReplyCommentShow = (ideaCommentId: any) => {
    try {
      this.setState(prevState => ({
        isReplyCommentShow: {
          ...prevState.isReplyCommentShow,
          [ideaCommentId]: !prevState.isReplyCommentShow[ideaCommentId]
        }
      }));
      this.getIdeaReplyComment(ideaCommentId);
    }
    catch (ex) {
      this.errorLog(ex, "toggleReplyCommentShow", "toggleReplyCommentShow", "afk-ideainnerpage");
    }

  };

  // To Submit Reply For Idea Comment 
  public SubmitReplyForIdeaComment = async (ideaCommentId: any, replyCommentID: any = 0, action: any = "ADD", ideaOwner: any = "", ideaTitle: any = "") => {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let commentToSave: any;
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      replyCommentID = this.state.CommentReplyId == 0 ? replyCommentID : this.state.CommentReplyId;
      action = this.state.ideaReply2CommentId == 0 ? action : "UPDATE";
      commentToSave = this.state.ideaReply2CommentId == 0 ? this.state.replyComment : this.state.editReplyComment;
      let params = {
        IDEACOMMENTID: ideaCommentId,
        IDEAID: this.ideaID,
        repliesid: replyCommentID,
        userid: user.prno,//user.userName,
        comment: commentToSave,
        submitteremailid: user.prno,//user.userEmailID,
        submittername: user.prno,//user.userName,
        action: action
      }

      const sK0y = this.state.sK0y;
      const jString = JSON.stringify(params);
      const hmacValue = this.generateHMAC(jString, sK0y);
      let headers: any;
      let jtv: any = localStorage.getItem("Jtv");
      let jtvparse = JSON.parse(jtv);
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
      apiResponse = await this.IdeationServices.postData(params, headers, "SubmitReplyForIdeaComment");
      responseData = apiResponse.data;
      if (responseData.data.respcode > 0) {
        if (action == "UPDATE") {
          this.setState(prevState => ({
            isReply2ShowtextBox: {
              ...prevState.isReply2ShowtextBox,
              [replyCommentID]: !prevState.isReply2ShowtextBox[replyCommentID]
            },
            //editComment:editComment
          }));
          console.log("SubmitReplyForIdeaComment Res", responseData.data);
          this.setState({
            replyComment: ""
          });
        }


      }
      this.getIdeaReplyComment(ideaCommentId);
    }
    catch (ex) {
      this.errorLog(ex, "SubmitReplyForIdeaComment", "SubmitReplyForIdeaComment", "afk-ideainnerpage");
    }

  }

  public onChangeReplyComment(e: any, selctedOptions: any) {
    debugger;
    this.setState({
      replyComment: selctedOptions
    });
  }

  public handleKeyPressReplyComment = (e: any, commentID: any) => {
    if (e.key === 'Enter') {
      if (this.state.replyComment == "") {
        return false;
      }
      this.SubmitReplyForIdeaComment(commentID);
    }
  }

  reportCommentId(ideaId: any, commentId: any) {
    this.setState({ reportIdeaId: ideaId, reportCommentId: commentId, stage1CommentReportDialog: true })
  }

  reportComment = () => {
    this.submitComment(this.state.reportIdeaId, this.state.reportCommentId, "commenthide");
    this.closestage1CommentReportDialog();
  }

  closestage1CommentReportDialog = () => {
    this.setState({ stage1CommentReportDialog: false })
  }

  reportStage2CommentId(ideaId: any, commentId: any, repliesId: any) {
    this.setState({ reportIdeaId: ideaId, reportCommentId: commentId, stage2CommentReportDialog: true, reportRepliesId: repliesId })
  }

  reportStage2Comment = () => {
    this.SubmitReplyForIdeaComment(this.state.reportCommentId, this.state.reportRepliesId, "replyhide");
    this.closestage2CommentReportDialog();
  }

  closestage2CommentReportDialog() {
    this.setState({ stage2CommentReportDialog: false })
  }

  public onChangeEditComment(e: any, selctedOptions: any) {
    this.setState({
      editComment: selctedOptions
    });
  }

  public handleKeyPressEditComment = (e: any, commentId: any) => {
    if (e.key === 'Enter') {
      if (this.state.editComment == "") {
        return false;
      }
      this.setState({
        editID: commentId
      })

      this.submitComment(this.ideaID, commentId, 'Edit');
    }
  }

  // To show text box
  public toggleReplyShowtextBox = (editComment: any, ideaCommentId: any) => {
    try {
      this.setState(prevState => ({
        isReplyShowtextBox: {
          ...prevState.isReplyShowtextBox,
          [ideaCommentId]: !prevState.isReplyShowtextBox[ideaCommentId]
        },
        editComment: editComment
      }));
    }
    catch (ex) {
      this.errorLog(ex, "toggleReplyShowtextBox", "toggleReplyShowtextBox", "afk-ideainnerpage");
    }

  };

  public onChangeReplyEditComment(e: any, selctedOptions: any) {
    this.setState({
      editReplyComment: selctedOptions
    });
  }

  // To Submit Reply For Idea Comment
  public handleKeyPressReplyEditComment = (e: any, ideaCommentId: any, CommentReplyId: any) => {
    try {
      if (e.key === 'Enter') {
        if (this.state.editReplyComment == "") {
          return false;
        }
        this.SubmitReplyForIdeaComment(ideaCommentId, CommentReplyId, "UPDATE")

      }
    }
    catch (ex) {
      this.errorLog(ex, "handleKeyPressReplyEditComment", "handleKeyPressReplyEditComment", "afk-ideainnerpage");
    }

  }

  // To show toggle for edit
  public toggleEditReplyShowtextBox = (ideaCommentId: any, CommentReplyId: any, comments: any) => {

    try {
      this.setState(prevState => ({
        isReply2ShowtextBox: {
          ...prevState.isReply2ShowtextBox,
          [CommentReplyId]: !prevState.isReply2ShowtextBox[CommentReplyId]
        },
        ideaReply2CommentId: ideaCommentId,
        CommentReplyId: CommentReplyId,
        editReplyComment: comments
      }));
    }
    catch (ex) {
      this.errorLog(ex, "toggleEditReplyShowtextBox", "toggleEditReplyShowtextBox", "afk-ideainnerpage");
    }

  };

  handleDownload(url: any) {
    console.log(url);
    window.open(url, '_blank');
  }

  formatDateDue(inputDate: string): string {
    // Create a new Date object from the input date string
    const date = new Date(inputDate);

    // Array of month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the day, month, and year from the Date object
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Format the date as "16 Aug 2024"
    return `${day} ${month} ${year}`;
  }

  public redirectHome = () => {
    window.location.replace("https://dewa.sharepoint.com/sites/qaideation");
  };

  // public async getGroupUserList() {
  //   debugger;
  //   const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
  //   // .filter(`${columnName} eq '${InnovationID}'`)
  //   let gName = "Campaign Manager"
  //   const listItems: any = await web.lists.getByTitle("Groupslist")
  //     .items
  //     .filter(`GroupName eq '${gName}'`)
  //     .get();

  //   if (listItems.length > 0) {
  //     let groupAllUserEmailID = listItems[0].EmailId;
  //     const emailsArray = groupAllUserEmailID.split(';');

  //     // Check if the array includes your particular email ID
  //     if (emailsArray.includes(this.state.loginUnemid.toLowerCase())) {
  //       this.setState({ isShowCreateCampaign: true });
  //       console.log('Your email ID exists in the list.');
  //     } else {
  //       this.setState({ isShowCreateCampaign: false });
  //       console.log('Your email ID does not exist in the list.');
  //     }
  //   }
  //   console.log("GroupUserList - ", listItems);

  // }

  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    if (lang) {
      let parsedlang = JSON.parse(lang);
      if (parsedlang.lang && parsedlang.lang == "ar") {
        this.setState({
          class: "ideainnerpage-ar", lang: "ar", reportthiscomment: 'هل تريد الإبلاغ عن هذا التعليق؟'
        });
        this.globalClass = "global-ar"
        body.classList.add('global-ar');
        this.langCode = 14337;
        this.getMyIdea();
        this.getAttachment();
        this.getIdeaComment(this.ideaID);
        this.getUserAttachment();
        this.getIdeaApproval();
      }
      else {
        this.setState({
          class: "ideainnerpage-en", lang: "en", reportthiscomment: 'Do you want to report this comment?'
        });
        this.globalClass = "global-en"
        body.classList.add('global-en');
        this.langCode = 1033;
        this.getMyIdea();
        this.getAttachment();
        this.getIdeaComment(this.ideaID);
        this.getUserAttachment();
        this.getIdeaApproval();
      }
    } else {
      this.setState({
        class: "ideainnerpage-en", lang: "en", reportthiscomment: 'Do you want to report this comment?'
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getMyIdea();
      this.getAttachment();
      this.getIdeaComment(this.ideaID);
      this.getUserAttachment();
      this.getIdeaApproval();
    }


  }

  handleCopy(id: any) {
    //this.handleCopy(item.ideaid,item.uservote,!item.uservote,item.ideaowner,item.ideatitle,item.userbookmark,1)
    // Access the item you want to copy (e.g., text)
    const itemToCopy = "https://dewa.sharepoint.com.mcas.ms/sites/qaideation/SitePages/IdeaInnerPage.aspx?ideaID=" + id;

    // Create a temporary textarea element to perform the copy action
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = itemToCopy;
    document.body.appendChild(tempTextarea);
    debugger;
    // Select and copy the item content
    tempTextarea.select();
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);

    // Optionally, provide feedback to the user
    console.log('Link copied to clipboard!');


  }

  public render(): React.ReactElement<IAfkIdeainnerpageProps> {
    //const { isInGroup } = this.state;
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;
    // const langText = this.state.lang === "en" ? en : ar;
    return (

      <div className="col-lg-12 afk-idea-inner-page">
        <div className={this.state.class}>
          <div className="row m-0">
            <div className="col-lg-12 px-4">
              <div className='row'>
                <div className='col-lg-12 back-heading head-navlink'>
                  <a className="cursor-pointer" onClick={() => this.redirectHome()}>
                    <img className='float-start' src={Backarrow} alt="backarrow-icon" width="16" height="16" />
                    <h2 className='back-heading ms-3 float-start'> {langText.idea}</h2>
                  </a>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <h2 className="h-lh-heading">
                    {this.state.ideaTitle}
                  </h2>
                  <h3 className="h-idea-heading" style={{ whiteSpace: 'pre-wrap' }}>
                    {console.log("readmore", this.state.isReadMore)}
                    {this.state.isReadMore ? (
                      <div className='show-all-lines'>
                        {this.state.ideaDesc.substring(0, 300)}
                        <span className='p-readmore' onClick={() => this.handleReadMoreClick()}>Read less</span>
                      </div>
                    ) : (
                      <div className='show-three-lines'>
                        {this.state.ideaDesc}
                        <span className='p-readmore' onClick={() => this.handleReadMoreClick()}>{langText.readmore}</span>
                      </div>
                    )}
                    {/* <div className='show-three-lines'>
                      {this.state.ideaDesc}
                      <span className='p-readmore'>{langText.readmore}</span>
                    </div> */}

                  </h3>
                  <h5 className="grey-text02">
                    <img
                      src={Globeicon}
                      alt="edit-icon"
                      width="12"
                      height="12"
                      className="float-start mt-1-5"
                    />
                    <span className="ms-2 mt-1 float-start">{this.formatDate(this.state.enteredon)}</span>
                    {/* <span className="float-start text-center">
      <i className="fa fa-circle dot-seperator"></i>
    </span>
    <img
      src={Timeicon}
      alt="edit-icon"
      width="12"
      height="12"
      className="float-start mt-1-5"
    /> */}
                    {/* <span className="mt-1 ms-2 float-start">
     
      {this.state.status}
    </span> */}
                    {/* <span className="float-start text-center">
      <i className="fa fa-circle dot-seperator"></i>
    </span>
    <span className="mt-1 float-start">.ID:{this.getYearFromDate(this.state.enteredon)}-{this.ideaID}</span> */}
                  </h5>
                </div>

                <div className="col-lg-12">
                  <hr className="border-topr" />
                </div>

                <div className="col-lg-12">
                  <div className="clearfix">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="float-start">
                          <p className="vcs-text me-3 float-start mb-0">
                            {this.state.cntvote} {langText.voteinner}
                          </p>
                          <p className="vcs-text me-3 float-start mb-0">
                            {this.state.commentList.length} {langText.commentsinner}
                          </p>
                          <p className="vcs-text float-start mb-0">
                            {this.state.cntshare}  {langText.sharesinner}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="float-end position-relative">
                          <p className="vcs-text-dark float-start mb-0 cursor-pointer share-drop me-4">

                          </p>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <hr className="border-topr" />
                </div>
                <div className="col-lg-12 p-0 cursor-pointer" >
                  <div className="d-flex">
                    <div className="flex-shrink-0">


                      {this.state.profileAttachments[this.state.submitterEmailID] && this.state.profileAttachments[this.state.submitterEmailID].map((attachment: profileAttachment) => (
                        <img
                          className="profile-img03"
                          src={attachment.imageUrl}
                          alt="user pic"
                        />))}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      {this.state.designationList[this.state.submitterEmailID] && this.state.designationList[this.state.submitterEmailID].map((item: userDesignation) => (
                        <h4 className="profile-name-text01">{item.name}</h4>
                      ))}
                      {this.state.designationList[this.state.submitterEmailID] && this.state.designationList[this.state.submitterEmailID].map((item: userDesignation) => (
                        <h5 className="grey-text02">
                          {item.designation}
                        </h5>))}
                      <h5 className="grey-text02">
                        <img
                          src={Globeicon}
                          alt="edit-icon"
                          width="12"
                          height="12"
                          className="float-start mt-1-5"
                        />
                        <span className="ms-2 mt-1 float-start">{this.formatDate(this.state.enteredon)}</span>{" "}
                        {/* <span className="mt-1 float-start">
                                    .ID:{item.ideaid}
                                  </span> */}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <ul className='himage-gallery'>
                    {this.state.imageList && this.state.imageList.map((attachment: Attachment) => (
                      <li>
                        {attachment.imageUrl != '' && (
                          <img key={attachment.imageUrl} src={attachment.imageUrl} alt="attachment" />
                        )}

                        {attachment.videoUrl != '' && (

                          <ReactPlayer
                            url={attachment.videoUrl}
                            width="100%"
                            height="100%"
                            controls={true} />

                        )}
                      </li>


                    ))}
                  </ul>
                </div>

                {/* download icon comes here */}
                <div className="col-lg-12">
                  <ul className='download-sec-container'>
                    {this.state.imageList && this.state.imageList.map((attachment: Attachment) => (
                      <li>
                        {attachment.pdfUrl != '' && (
                          <>
                            {/* <img src={hbanner10} alt="attachment" /> */}
                            <div className="col-lg-12 p-0 download-btn-section">
                              <div className="row justify-content-center">
                                <p className="col-4 vcs-text-dark text-center mt-3  mb-0 cursor-pointer">
                                  <img
                                    src={Downloadicon}

                                    alt="edit-icon"
                                    width="20"
                                    height="20"
                                    className='downloadicon-img' />
                                  <span className="ms-2 text-green" onClick={() => this.handleDownload(attachment.pdfUrl)}>{langText.downloadinner}</span>
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* download icon comes here */}

                <div className="col-lg-12">
                  <hr className="border-topr" />
                </div>

                <div className="col-lg-12">
                  <div className="clearfix">
                    <div className="float-start">

                      <p className="vcs-text-dark float-start mb-0 cursor-pointer share-drop">
                        <div className="dropdown">
                          <a
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={Shareicon}
                              alt="edit-icon"
                              width="20"
                              height="20"
                            />
                            {/*<span className="ms-2">{langText.share}</span>*/}
                            <span className="ms-2">share</span>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#Linkcopiedmodal">
                                <img
                                  src={Sharecopylinkicon}
                                  alt="edit-icon"
                                  width="24"
                                  height="24"
                                />
                                <span className="ms-2" onClick={() => this.handleCopy(this.ideaID)}>{langText.copylink}</span>
                              </a>
                              <hr className="dropdown-divider" role="separator" />
                              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#DirectMessageSentmodal">
                                <img
                                  src={Sharesenddirectlinkicon}
                                  alt="edit-icon"
                                  width="24"
                                  height="24"
                                />
                                {/* <span className="ms-2" onClick={() => this.redirectToMessage(item.ideaid, item.uservote, !item.uservote, item.ideaowner, item.ideatitle, item.userbookmark, 1)}>
                                              {" "}
                                              {langText.sendviadirectmessage}
                                            </span> */}
                              </a>
                            </div>
                          </a>

                        </div>
                      </p>
                    </div>
                    <div className="float-end">
                      {this.state.userbookmark == "0" && (
                        <p className="vcs-text float-start mb-0 cursor-pointer" data-tip data-for="BookmarkTip">
                          <a
                            className="bookmarks-icon"
                            onClick={() => this.submitBookmark(this.state.ideaID, 1, 0, 1)}
                            data-bs-toggle="modal"
                            data-bs-target="#Bookmarkmodal"
                          />
                        </p>
                      )}

                      {this.state.userbookmark == "1" && (
                        <p className="vcs-text float-start mb-0 cursor-pointer" data-tip data-for="RemoveBookmarkTip">
                          <a
                            className="bookmarks-icon-black"
                            onClick={() => this.submitBookmark(this.state.ideaID, 0, 1, 0)}
                            data-bs-toggle="modal"
                            data-bs-target="#Bookmarkmodal"
                          />
                        </p>
                      )}

                      {this.state.userbookmark == "0" && (
                        <ReactTooltip id="BookmarkTip" place="top" effect="solid">
                          {langText.bookmark}
                        </ReactTooltip>
                      )}

                      {this.state.userbookmark == "1" && (
                        <ReactTooltip id="RemoveBookmarkTip" place="top" effect="solid">
                          {langText.removebookmark}
                        </ReactTooltip>
                      )}
                    </div>

                  </div>
                </div>
                <div className="col-lg-12 mt-4">
                  <h2 className="h-lh-heading02">Idea Type</h2>


                  <h3 className="h-idea-heading">{this.state.ideatype}</h3>
                </div>
                <div className="col-lg-12 mt-4">
                  <h2 className="h-lh-heading02">Target Division</h2>


                  <h3 className="h-idea-heading">{this.state.division}</h3>
                </div>
                <div className="col-lg-12 mt-4">
                  <h2 className="h-lh-heading02">Value chain</h2>


                  <h3 className="h-idea-heading">{this.state.value_chain}</h3>
                </div>
                <div className="col-lg-12 mt-4">
                  <h2 className="h-lh-heading02">Innovation Enablers</h2>


                  <h3 className="h-idea-heading">{this.state.innovationenablers}</h3>
                </div>

                <div
                  className={this.state.bookMarkClass}
                  id="Bookmarkmodal"
                  aria-labelledby="BookmarkmodalLabel"
                  aria-hidden="true"
                  data-backdrop="false"
                >
                  <div className="modal-dialog modal-tw">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="toast-body">
                              <div className="clearfix">
                                <img
                                  src={Bookmarkiconwhite}
                                  className="float-start me-2"
                                  alt="edit-icon"
                                  width="16"
                                  height="20"
                                />
                                <p className="float-start mb-0 me-2">
                                  {/* {this.state.addedtoyourbookmarks} */}
                                  {this.state.bookMarkDesc}
                                  {/* Added to your Bookmarks */}
                                </p>
                                <a
                                  className="float-end tb-link"
                                  href="https://dewa.sharepoint.com/sites/qaideation/SitePages/Bookmarks.aspx"
                                >
                                  <strong>
                                    {langText.view}
                                  </strong>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mt-4">
                  <h2 className="h-lh-heading02">{langText.benefitinner}</h2>


                  <h3 className="h-idea-heading">{this.state.benefit}</h3>
                </div>



                {/* <div className="col-lg-12 mt-4">
                <h2 className="h-lh-heading02">{langText.categoryinner}</h2>
                <h3 className="h-idea-heading">{this.state.ideapath}</h3>
              </div>*/}

                {(this.state.isShowCreateCampaign || this.state.isInGroup) && (

                  <div className="col-lg-12 mt-4">
                    <h2 className="h-lh-heading02">{langText.ideatarckinginner}</h2>

                    <div className="it-container mt-4">
                      {this.state.IdeaTrackingList.map((item: any, index: any) => (
                        <div className="timeline-block timeline-block-right" key={index}>
                          <div className="marker">
                            <span>{index + 1}</span>
                          </div>
                          <div className="timeline-content">
                            <div className="col-lg-12 position-relative">
                              <div className="h-border-box-outline">
                                <div className="col-lg-12 p-0 clearfix">
                                  <h2 className="h-lh-heading02 clearfix c-it">
                                    <span className="float-start">
                                      {item.approverremarks}

                                    </span>
                                    <img
                                      className="float-start ms-2 mt-1"
                                      src={Infocircle}
                                      alt="edit-icon"
                                      width="18"
                                      height="18"
                                    />

                                    <span className="float-start ms-2  badge rounded-pill text-dark bg-success"><span>{item.approvalstatus}</span></span>
                                  </h2>
                                </div>
                                <div className="col-lg-12 p-0">
                                  <div className="d-flex">
                                    <div className="flex-shrink-0">
                                      {this.state.profileAttachments[item.submitteremailid] && this.state.profileAttachments[item.submitteremailid].map((attachment: profileAttachment) => (
                                        <img
                                          className="profile-img05"
                                          src={attachment.imageUrl}
                                          alt="user pic"
                                        />))}
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                      {this.state.designationList[item.approvername] && this.state.designationList[item.approvername].map((item1: userDesignation) => (
                                        <h4 className="profile-name-text01 mb-0">
                                          {item1.name}
                                        </h4>))}
                                      <h5 className="grey-text02">
                                        {this.state.approverroleList[item.approvalid] && this.state.approverroleList[item.approvalid].map((item1: approverrole) => (
                                          <span className="float-start mt-1-5">
                                            {" "}
                                            {item1.approverrole}  Moved to {item1.approverrole1}
                                          </span>))}
                                        <span className="float-start text-center">
                                          <i className="fa fa-circle dot-seperator"></i>
                                        </span>

                                        <span className="float-start mt-1-5">
                                          {" "}
                                          {this.formatDateDue(item.enteredon)}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row m-0">
            <div className="col-lg-12 p-0">
              <hr className="border-topr" />
            </div>
            <div className="col-lg-12 px-4 mt-2">
              <div className="row">
                <div className="col-lg-12 ">
                  <h2 className="h-lh-heading02">
                    {langText.commentsinner} (<span>{this.state.commentList.length}</span>)
                  </h2>
                </div>
                {this.state.submitterEmailId != this.loggedInUser && (
                  <div className="col-lg-12 input-with-img testing">
                    <div className="mb-3 mt-4 input-group">
                      <span className="input-group-text" id="basic-addon1">
                        {this.userImageUrl != '' && (
                          <img
                            className="profile-img02"
                            src={this.userImageUrl}
                            alt="user pic"
                          />
                        )}
                        {this.userImageUrl == '' && (

                          <img
                            className="profile-img02"
                            src={DummyProfileimg}
                            alt="user pic"
                          />)}
                      </span>
                      <TextField
                        placeholder={langText.shareyourthoughtsinner}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className="form-control"
                        value={this.state.comment}
                        onChange={(e, newValue) => this.onChangeComment(e, newValue)}
                        onKeyPress={(e) => this.handleKeyPress(e, this.ideaID)}
                      />
                    </div>
                  </div>)}
                {this.state.commentList.map((commentItem: any) => (

                  <div className="col-lg-12 position-relative mt-3 mytesting" key={commentItem.commentid}>
                    <div className="h-border-box-reply">
                      <div className="col-lg-12 p-0">
                        <div className="d-flex">
                          <div className="flex-shrink-0 testing">
                            {this.state.profileAttachments[commentItem.submitteremailid] && this.state.profileAttachments[commentItem.submitteremailid].map((attachment: profileAttachment) => (
                              <img
                                className="profile-img04"
                                src={attachment.imageUrl}
                                alt="user pic"
                              />))}
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <div className="row">
                              <div className="col-lg-8">
                                {this.state.designationList[commentItem.submitteremailid] && this.state.designationList[commentItem.submitteremailid].map((item1: userDesignation) => (
                                  <h4 className="profile-name-text02">
                                    {item1.name}
                                  </h4>
                                ))}
                                {this.state.designationList[commentItem.submitteremailid] && this.state.designationList[commentItem.submitteremailid].map((item1: userDesignation) => (
                                  <h5 className="grey-text03">
                                    {item1.designation}
                                  </h5>
                                ))}
                              </div>
                              <div className="col-lg-4">
                                <div className="float-end">
                                  <h5 className="grey-text03  float-start">
                                    {this.formatTimeElapsed(commentItem.enteredon)}
                                  </h5>
                                  <div className="small-drop-e float-start">

                                    <div className="dropdown">
                                      <a
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <img
                                          src={Replyellipsesicon}
                                          alt="edit-icon"
                                          width="24"
                                          height="24"
                                        />
                                        <div className="dropdown-menu">
                                          <a onClick={() => this.submitComment(this.ideaID, commentItem.commentid, "DELETE", this.state.submitterUserName, this.state.ideaTitle)} className="dropdown-item cursor-pointer" >

                                            <img
                                              src={deletecomment}
                                              alt="edit-icon"
                                              width="24"
                                              height="24"
                                            />
                                            <span className="ms-2 dc-red">  {langText.deletecomment}</span>
                                          </a>
                                          <hr
                                            className="dropdown-divider"
                                            role="separator"
                                          />
                                          <a onClick={() => this.toggleReplyShowtextBox(commentItem.comments, commentItem.commentid)} className="dropdown-item cursor-pointer">

                                            <img
                                              src={editcomment}
                                              alt="edit-icon"
                                              width="24"
                                              height="24"
                                            />
                                            <span className="ms-2 dc-dark">  {langText.editcomment}</span>
                                          </a>


                                          <hr
                                            className="dropdown-divider"
                                            role="separator"
                                          />
                                          <a className="dropdown-item cursor-pointer" onClick={() => this.reportCommentId(this.ideaID, commentItem.commentid)}  >

                                            <img
                                              src={reportcomment}
                                              alt="edit-icon"
                                              width="24"
                                              height="24"
                                            />
                                            <span className="ms-2 dc-dark">  {langText.report}</span>
                                          </a>
                                        </div>
                                      </a>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 p-3 grey-box-reply mt-2">
                        {(!this.state.isReplyShowtextBox[commentItem.commentid] &&
                          <h3 className="h-idea-heading-reply mb-0">
                            {commentItem.comments}
                          </h3>)}
                        {(this.state.isReplyShowtextBox[commentItem.commentid] &&
                          <TextField
                            placeholder={langText.editcomment}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className="form-control"
                            value={this.state.editComment}
                            onChange={(e, newValue) => this.onChangeEditComment(e, newValue)}
                            onKeyPress={(e) => this.handleKeyPressEditComment(e, commentItem.commentid)}
                          />)}
                      </div>

                      <div className="col-lg-12 mt-3">
                        <div className="clearfix">
                          <div className="float-start">
                            {commentItem.uservotecount == "0" && (
                              <p className="vcs-text-dark me-3 float-start mb-0 cursor-pointer">
                                <div onClick={() => this.submitVoteForComment(this.ideaID, commentItem.commentid, "1")} className="vote-icon">
                                  <span >{commentItem.votecount}</span>
                                </div>

                              </p>
                            )}
                            {commentItem.uservotecount == "1" && (
                              <p className="vcs-text-dark me-3 float-start mb-0 cursor-pointer">
                                <div onClick={() => this.submitVoteForComment(this.ideaID, commentItem.commentid, "0")} className="vote-green-icon">
                                  <span>{commentItem.votecount}</span>
                                </div>
                              </p>
                            )}

                            <p onClick={() => this.getIdeaReplyComment(commentItem.commentid)} className="vcs-text-dark float-start mb-0 cursor-pointer">
                              <img
                                src={Commentreplyicon}
                                alt="edit-icon"
                                width="20"
                                height="20"
                              />
                              {commentItem.repliescount < 2 && (
                                <span className="ms-2">{commentItem.repliescount} {langText.reply}</span>
                              )}
                              {commentItem.repliescount >= 2 && (
                                <span className="ms-2">{commentItem.repliescount} {langText.replies}</span>
                              )}

                            </p>
                          </div>
                          <div className="float-end">
                            <p className="vcs-text-dark float-start mb-0 cursor-pointer" onClick={() => this.toggleReplyCommentShow(commentItem.commentid)}>
                              <span className="ms-2">{langText.reply1}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {this.state.isReplyCommentShow[commentItem.commentid] && (
                      <div className="col-lg-12 padding-rpy">

                        {this.state.replyCommentList.map((replyCommentItem: any) => (
                          <div className="col-lg-12 position-relative mt-5">
                            <div className="h-border-box-reply">
                              <div className="col-lg-12 p-0">
                                <div className="d-flex">
                                  <div className="flex-shrink-0">
                                    {this.state.profileAttachments[replyCommentItem.submitteremailid] && this.state.profileAttachments[replyCommentItem.submitteremailid].map((attachment: profileAttachment) => (
                                      <img
                                        className="profile-img04"
                                        src={attachment.imageUrl}
                                        alt="user pic"
                                      />))}
                                  </div>
                                  <div className="flex-grow-1 ms-2">
                                    <div className="row">
                                      <div className="col-lg-8">
                                        {this.state.designationList[replyCommentItem.enteredby] && this.state.designationList[replyCommentItem.enteredby].map((item: userDesignation) => (
                                          <><h4 className="profile-name-text02">
                                            {item.Ideaowner}
                                          </h4><h5 className="grey-text03"> {item.designation}</h5></>))}
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="float-end">
                                          <h5 className="grey-text03  float-start">
                                            {this.formatDate(replyCommentItem.enteredon)}
                                          </h5>
                                          <div className="small-drop-e float-start">

                                            <div className="dropdown">
                                              <a
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <img
                                                  src={Replyellipsesicon}
                                                  alt="edit-icon"
                                                  width="24"
                                                  height="24"
                                                />
                                                <div className="dropdown-menu">

                                                  <a className="dropdown-item" onClick={() => this.SubmitReplyForIdeaComment(commentItem.commentid, replyCommentItem.repliesid, "DELETE")}>
                                                    <img
                                                      src={deletecomment}
                                                      alt="edit-icon"
                                                      width="24"
                                                      height="24"
                                                    />
                                                    <span className="ms-2 dc-red"> {langText.deletecomment}</span>
                                                  </a>
                                                  <hr
                                                    className="dropdown-divider"
                                                    role="separator"
                                                  />
                                                  <a className="dropdown-item" href="#"
                                                    onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid, replyCommentItem.repliesid, replyCommentItem.comments)} >
                                                    <img
                                                      src={editcomment}
                                                      alt="edit-icon"
                                                      width="24"
                                                      height="24"
                                                    />
                                                    <span className="ms-2 dc-dark"> {langText.editcomment}</span>

                                                  </a>

                                                  <hr
                                                    className="dropdown-divider"
                                                    role="separator"
                                                  />
                                                  <a className="dropdown-item" onClick={() => this.reportStage2CommentId(this.ideaID, commentItem.commentid, replyCommentItem.repliesid)}>
                                                    <img
                                                      src={reportcomment}
                                                      alt="edit-icon"
                                                      width="24"
                                                      height="24"
                                                    />
                                                    <span className="ms-2 dc-dark">{langText.report}</span>

                                                  </a>
                                                </div>
                                              </a>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div
              className={this.state.bookMarkClass}
              id="Bookmarkmodal"
              aria-labelledby="BookmarkmodalLabel"
              aria-hidden="true"
              data-backdrop="false"
            >
               <div className="modal-dialog modal-tw">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="toast-body">
                          <div className="clearfix">
                            <img
                              src={Bookmarkiconwhite}
                              className="float-start me-2"
                              alt="edit-icon"
                              width="16"
                              height="20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  */}

                              <div className="col-lg-12 p-3 grey-box-reply mt-2">
                                {/* <p>{this.state.isReply2ShowtextBox[replyCommentItem.repliesid]}</p> */}
                                {(!this.state.isReply2ShowtextBox[replyCommentItem.repliesid] &&
                                  <h3 className="h-idea-heading-reply mb-0">
                                    {replyCommentItem.comments}{" "}
                                  </h3>)}
                                {(this.state.isReply2ShowtextBox[replyCommentItem.repliesid] &&
                                  <TextField
                                    placeholder={langText.editcomment}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className="form-control"
                                    value={this.state.editReplyComment}
                                    onChange={(e, newValue) => this.onChangeReplyEditComment(e, newValue)}
                                    onKeyPress={(e) => this.handleKeyPressReplyEditComment(e, commentItem.commentid, replyCommentItem.repliesid)}
                                  />)}
                              </div>

                              <div className="col-lg-12 mt-3">
                                <div className="clearfix">
                                  <div className="float-start">
                                    <p className="vcs-text-dark me-3 ms-3 float-start mb-0 cursor-pointer">
                                      <img
                                        src={Voteicon}
                                        alt="edit-icon"
                                        width="20"
                                        height="20"
                                      />
                                      <span className="ms-2">{replyCommentItem.uservotecount}</span>
                                    </p>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="col-lg-12 input-with-img">


                          <div className="mb-3 mt-4 input-group">
                            <span className="input-group-text" id="basic-addon1">
                              {this.userImageUrl != '' && (
                                <img
                                  className="profile-img02"
                                  src={DummyProfileimg}
                                  alt="user pic"
                                />
                              )}
                              {this.userImageUrl != '' && (
                                <img
                                  className="profile-img02"
                                  src={this.userImageUrl}
                                  alt="user pic"
                                />)}
                            </span>
                            <TextField
                              placeholder={langText.addareply}
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              className="form-control"
                              value={this.state.replyComment}
                              onChange={(e, newValue) =>
                                this.onChangeReplyComment(e, newValue)}
                              onKeyPress={(e) => this.handleKeyPressReplyComment(e, commentItem.commentid)}
                            />
                          </div>

                        </div>

                      </div>
                    )}

                  </div>

                ))}

              </div>
            </div>
          </div>
          {/* loader section */}
          <div className="row m-0">
            {this.state.isLoader && (
              <div className="col-lg-12 p-0">
                <div className="lds-ring-backdrop">
                  <div className="lds-ring-container">
                    <div className='ebtloader'></div>
                    <div className="text-center lds-text">{langText.loading}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* loader section */}
          <Dialog
            hidden={!this.state.stage1CommentReportDialog}
            onDismiss={this.closestage1CommentReportDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: this.state.reportthiscomment,
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
              <DefaultButton className="btn-clear" onClick={() => this.closestage1CommentReportDialog()} text={langText.closed} />
              <DefaultButton className="btn-approve" onClick={() => this.reportComment()} text={langText.yes} />

            </DialogFooter>
          </Dialog>
          <Dialog
            hidden={!this.state.stage2CommentReportDialog}
            onDismiss={this.closestage2CommentReportDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: this.state.reportthiscomment,
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
              <DefaultButton className="btn-clear" onClick={() => this.closestage2CommentReportDialog()} text={langText.closed} />
              <DefaultButton className="btn-approve" onClick={() => this.reportStage2Comment()} text={langText.yes} />

            </DialogFooter>
          </Dialog>
        </div>
      </div>
    )
  }
}
