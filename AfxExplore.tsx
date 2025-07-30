import * as React from 'react';
//import styles from './AfkExplore.module.scss';
import type { IAfkExploreProps } from './IAfkExploreProps';
//import { escape } from '@microsoft/sp-lodash-subset';

import "./../assets/css/afstyle.css";
// import * as $ from "jquery";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");

import Filtericon from "./../assets/img/svg/filter-icon.png";
//import ProfileImg11 from "./../assets/img/profile-img11.jpg";
import Globeicon from "./../assets/img/svg/globe-icon.png";
import Implementedthumbsicon from "./../assets/img/svg/implemented-thumbs.png";
import Sharecopylinkicon from "./../assets/img/svg/share-copylink-icon.png";
import Sharesenddirectlinkicon from "./../assets/img/svg/share-send-directlink-icon.png";
import Bookmarkiconwhite from "./../assets/img/svg/bookmark-icon-filled-white.png";

import Commenticon from "./../assets/img/svg/comment-icon.png";
import Shareicon from "./../assets/img/svg/share-icon.png";
import Downloadicon from "./../assets/img/svg/download-icon.png";
import { DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, 
  //IStackTokens, 
  SearchBox, 
  //Stack, 
  TextField } from '@fluentui/react';
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
import MIe01 from "./../assets/img/svg/modal/submitted-thumbs.png";
import Commentreplyicon from "./../assets/img/svg/comment-reply-icon.png";
import Replyellipsesicon from "./../assets/img/svg/ellipses-reply.png";
//import ProfileImg14 from "./../assets/img/profile-img14.jpg";
// import ProfileImg02 from "./../assets/img/profile-img.jpg";
// import ProfileImg06 from "./../assets/img/profile-img06.jpg";
//import Voteicon from "./../assets/img/svg/vote-icon.png";
//import NoDataicon from "./../assets/img/no_data.png";
import DummyProfileimg from "./../assets/img/profile-img13.jpg";
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';


import deletecomment from "./../assets/img/svg/comment-delete.png";
import editcomment from "./../assets/img/svg/comment-edit.png";


// $('#myModal').modal({backdrop: 'static', keyboard: false})



//import { SearchBox } from "@fluentui/react/lib/SearchBox";

// import {
//   //Dropdown,
//   DropdownMenuItemType,
//   IDropdownOption,
//   // IDropdownProps,
// } from "@fluentui/react/lib/Dropdown";
// import { IStackTokens } from "@fluentui/react/lib/Stack";
import { IAfkExploreStates } from './IAfkExploreStates';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
import { Web } from 'sp-pnp-js';
import ReactTooltip from 'react-tooltip';
import * as CryptoJS from 'crypto-js';
import hbanner10 from "./../assets/img/hbanner10.png";
import ReactPlayer from 'react-player';
//const stackTokens: IStackTokens = { childrenGap: 20 };
const dropdownStyles = { dropdown: { width: 300 } };

// interface Attachment {
//   imageUrl: string;
//   IdeaID: number;
//   pdfUrl: string;
//   videoUrl: string;
// }
interface profileAttachment {
  imageUrl: string;
  IdeaID: number;
}

interface userDesignation {
  designation: string;
  Ideaowner: number;
  name: string;
  arname: string;

}

export default class AfkExplore extends React.Component<IAfkExploreProps, IAfkExploreStates, {}> {
  private IdeationServices: IdeationAPIServices;
  loggedInUser: any;
  userInfo: any
  userImageUrl: any;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkExploreProps, state: IAfkExploreStates) {
    super(props);
    this.IdeationServices = new IdeationAPIServices();
  
    this.state = {
      isSuccess: false,
      isLoader: true,
      isSuccessDialogVisible: false,
      isDialogVisible: false,
      successMessageDesciption: "",
      successMessageTitle: "",
      errorDesciption: "",
      errorTitle: "",
      allIdeaList: [],
      imageList: [],
      token: "",
      comment: "",
      commentList: [],
      isCommentShow: {},
      isCommentLoadMore: false,
      allCommentList: [],
      editID: 0,
      ideaID: "",
      startnum: 0,
      limit: 50,
      filterName: "Recent",
      isBookmarkModalOpen: false,
      topFilter: 'ALL',
      targetDivisionList: [],
      selectedTargetDivisionKey: '',
      selectedTargetDivisionText: 'ALL',
      benifitsList: [],
      selectedBenifitsKey: '',
      selectedBenifitsText: 'ALL',
      innovationEnablersList: [],
      selectedInnovationEnablersKey: '',
      selectedInnovationEnablersText: 'ALL',
      ideaPathList: [],
      selectedIdeaPathKey: '',
      selectedIdeaPathText: 'ALL',
      searchText: "",
      searchArrayList: [],
      isReplyCommentShow: false,
      replyStage1Comment: '',
      replyStage1CommentList: [],
      loginUserName: '',
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
      replyComment: '',
      automateTitle: '',
      automateOwner: '',
      automateComment: '',
      bookMarkClass: 'modal fade',
      bookMarkDesc: 'Added to your Bookmarks',
      filterWithCase: '',
      modalClass: 'modal fade e-backdrop',
      modalTime: 0,
      attachments: {},
      profileAttachments: {},
      uniqueIds: [],
      sK0y: "",
      isHMAC: "",
      dropdownClass: 'dropdown-menu',
      designationList: {},
      lang: "en",
      class: "afkexplore-en",
      recent:"",
      implemented:"",
      latestsubmissions:"",
      oldsubmissions:"",
      mostliked:"",
      mostcomments:"",
      englishContent:"",
      arabicContent:"",
      Recent:"",
    }
  }

  public async componentDidMount(): Promise<void> {
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    this.loggedInUser = user.prno;
    await this.getHMACENABLEorDISABLE();
    await this.getToken();
    this.fetchJsonFile('ar.json');
    this.fetchJsonFile('en.json');
    this.changeLanguage();
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', this.handleScroll);
    // Load initial set of ideas
   

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

  changeLanguage() {
    const body = document.body;
    body.classList.remove(this.globalClass);
    let lang: any = localStorage.getItem('lang');
    let parsedlang = JSON.parse(lang);
    if (parsedlang.lang == "ar") {
      this.setState({
        class: "afkexplore-ar", lang: "ar", recent:'حديث',implemented:'تنفيذ',latestsubmissions:'آخر تقديم', oldsubmissions:'التقديمات القديمة',mostliked:'الأكثر إعجابا',mostcomments:'معظم التعليقات',Recent:'حديث'
        // errorMessage: 'رسالة خطأ', hasBeen: ' تم  ', byYOu: ' بواسطتك', successfully: 'بنجاح.', recordedVideo: 'فيديو مسجل',
        // successMessage: 'رسالة نجاح', unableTo: "غير قادرعلى", tryAgainlater: 'الرجاء المحاولة مرة اخرى لاحقاً', warningMessage: "رسالة تحذير", youHavealready: 'لديك بالفعل', thisidea: 'هذه الفكرة'
      });
      this.globalClass = "global-ar"
      body.classList.add('global-ar');
      this.langCode = 14337;
      this.getAttachment();
    this.getProcessListValues();
    setTimeout(() => {
      this.getallIdeasforexplore(0, 'ALL', 'ALL');
    }, 1000);
    this.getUserAttachment();
    }
    else {
      this.setState({
        class: "afkexplore-en", lang: "en",recent:'Recent',implemented:'Implemented',latestsubmissions:'Latest Submissions', oldsubmissions:'Old Submissions',mostliked:'Most Liked',mostcomments:'Most Comments',Recent:'Recent'
        // errorMessage: 'Error message', hasBeen: ' has been', byYOu: 'By you.', successfully: 'Successfully', recordedVideo: 'Recorded Video',
        // successMessage: 'Success Message', unableTo: 'Unable to ', tryAgainlater: '. Please try again later.', warningMessage: 'Warning message', youHavealready: 'You have already ', thisidea: 'this idea'
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getAttachment();
    this.getProcessListValues();
    setTimeout(() => {
      this.getallIdeasforexplore(0, 'ALL', 'ALL');
    }, 1000);
    this.getUserAttachment();
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
  componentWillUnmount() {
    // Remove scroll event listener when the component unmounts to avoid memory leaks
    window.removeEventListener('scroll', this.handleScroll);
  }
  // Function to handle scrolling
  handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Load more items when the bottom is reached
      this.loadMoreItems();
    }
  };
  // Function to load more items
  loadMoreItems = () => {
    // Prevent multiple simultaneous requests
    if (!this.state.isLoader) {
      // Set isLoader state to true to indicate loading
      this.setState({ isLoader: true }, async () => {
        // Increment the startnum to load the next set of items
        const newStartnum = this.state.startnum + this.state.limit;
        // Load data with the new startnum
        await this.getallIdeasforexplore(newStartnum, '', 'ALL');
        // Update startnum in state
        this.setState({ startnum: newStartnum, isLoader: false });
      });
    }
  };

  public async getProcessListValues() {
    debugger;

    let apiResponse: any;
    let responseData: any = [];
    let params = {
      processname: "GENERAL IDEA",
      LANGUAGECODE: "1033"
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
    apiResponse = await this.IdeationServices.getData(params, headers, "getProcessListValues");
    responseData = apiResponse.data;
    let targetDivisionArray: any;
    let targetDivisionList: any = [];
    targetDivisionArray = responseData.data.filter((a: any) => a.fieldname == "TARGET DIVISION");
    for (let i = 0; i < targetDivisionArray.length; i++) {
      targetDivisionList.push({ key: targetDivisionArray[i].listid, text: targetDivisionArray[i].listvalue });
    }
    let benifitsArray: any;
    let benifitsList: any = [];
    benifitsArray = responseData.data.filter((a: any) => a.fieldname == "BENEFITS");
    for (let i = 0; i < benifitsArray.length; i++) {
      benifitsList.push({ key: benifitsArray[i].listid, text: benifitsArray[i].listvalue });
    }
    let innovationEnablersArray: any;
    let innovationEnablersList: any = [];
    innovationEnablersArray = responseData.data.filter((a: any) => a.fieldname == "INNOVATION ENABLERS");
    for (let i = 0; i < innovationEnablersArray.length; i++) {
      innovationEnablersList.push({ key: innovationEnablersArray[i].listid, text: innovationEnablersArray[i].listvalue });
    }
    let ideaPathArray: any;
    let ideaPathList: any = [];
    ideaPathArray = responseData.data.filter((a: any) => a.fieldname == "IDEA PATH");
    for (let i = 0; i < ideaPathArray.length; i++) {
      ideaPathList.push({ key: ideaPathArray[i].listid, text: ideaPathArray[i].listvalue });
    }
    this.setState({ targetDivisionList: targetDivisionList, benifitsList: benifitsList, innovationEnablersList: innovationEnablersList, ideaPathList: ideaPathList });

  }
  public async getUserAttachment() {
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
    let attachmentFiles = [];
    attachmentFiles = listItems;
    if (attachmentFiles.length > 0) {
      let attachmentPath = "Lists/" + "ProfilePicture/" + "Attachments/";
      this.userImageUrl = "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[0].Id + '/' + attachmentFiles[0].Title;

    }
    else {
      this.userImageUrl = "";
    }
    console.log(this.userImageUrl);
  }
  fetchAttachmentsForAllProfile = async (uniqueIds: any) => {
    for (const Innovators of uniqueIds) {
      await this.fetchAttachmentsForProfile(Innovators);
    }
  };

  fetchAttachmentsForProfile = async (EmailID: any) => {
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
        imageURLList = [{
          imageUrl: `${DummyProfileimg}`,
          EmailID: EmailID

        }]

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
  };
  public getallIdeasforexplore = async (startnum = 0, action = "", filter = "", actionWithCase = "") => {
    debugger;
    this.setState({ isLoader: true, allIdeaList: [], topFilter: filter, filterWithCase: actionWithCase == "" ? "Recent" : actionWithCase });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);

    //console.log("getMyChallenge", user.userName)
    let params = {
      userid: (user.prno != undefined && user.prno != null && user.prno != '') ? user.prno : "0",
      valuechain: filter,
      targetdivision: this.state.selectedTargetDivisionText,
      benefit: this.state.selectedBenifitsText,
      ideapath: this.state.selectedIdeaPathText,
      innovationenablers: this.state.selectedInnovationEnablersText,
      action: action.toUpperCase(),
      startnum: startnum,
      limit: this.state.limit,
      searchtext: "0"

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
    apiResponse = await this.IdeationServices.getData(params, headers, "getAllIdeas");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("allIdeaList", dataList);
      for(let i=0; i<dataList.length;i++){
        dataList[i].original = true;
        dataList[i].translated = false;
      }
      this.setState({
        isLoader: false,
        allIdeaList: dataList,
        filterName: action == "" ? "Recent" : action,
        searchArrayList: dataList,
        filterWithCase: actionWithCase == "" ? this.state.Recent : actionWithCase
      }, () => {
        let uniqueIds = dataList.reduce((acc: any, current: any) => {
          if (!acc.includes(current.ideaowner)) {
            acc.push(current.ideaowner);
          }
          return acc;
        }, []);
        this.setState({ uniqueIds: uniqueIds });
        this.fetchAttachmentsForAllIdeas();
        this.fetchAttachmentsForAllProfile(uniqueIds);
        this.fetchDesignationForAllIdeas();
      });
      console.log("State allIdeaList", this.state.allIdeaList);
    }
    //  else {
    //   if (this.state.modalTime == 0) {
    //     this.setState({ modalClass: "modal fade e-backdrop show", isLoader: false });
    //   }
    //   else {
    //     this.setState({ modalClass: "modal fade e-backdrop", isLoader: false });
    //   }

    // }
    this.setState({ bookMarkClass: "modal fade" })
  }

  fetchDesignationForAllIdeas = async () => {
    for (const idea of this.state.allIdeaList) {
      await this.getEmployeeDetails(idea.ideaowner);
    }
  };

  public async getEmployeeDetails(prno: any) {
    try {
      let apiResponse: any;
      let responseData: any = [];
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
      console.log("employeedetails", responseData);
      //return responseData.jobtitle;
      let List: any;
      let designation = responseData.jobtitle;
      let nameEn = responseData.name;
      let namear = responseData.fullnameinArabic;
      console.log("designation", designation, prno);
      List = [];
      //List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
      if(this.state.lang == 'en'){
        List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
        }
        if(this.state.lang == 'ar'){
          List.push({ Ideaowner: prno, designation:  responseData.jobtitleinArabic, name: namear, arname: namear })
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
  //     //this.getallIdeasforexplore(0, '', 'ALL');
  //     console.log("Token - ", tokenInfo[0].Token);
  //   }
  // }
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
  public submitVote = async (ideaId: any, isLike: any, isDisLike: string, ideaOwner: any, ideaTitle: any, isbookmarked: any, isShare: any) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let params = {
      ideaid: ideaId,
      userid: user.prno,
      idealike: isLike,
      ideadislike: isDisLike,
      suggestions: "",
      shareidea: isShare,
      bookmark: isbookmarked,
      submitteremailid: user.prno,
      submitterusername: user.prno
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
    apiResponse = await this.IdeationServices.postData(params, headers, "SubmitVote");
    responseData = apiResponse.data;
    if (responseData.data.respcode > 0) {
      this.insertNotification("Voted for your idea - " + ideaTitle, "Vote", ideaId, ideaOwner, "Explore");
      console.log("SubmitVote Res", responseData.data);
      let dataList = this.state.allIdeaList.filter((a: any) => a.ideaid == ideaId);
     let voteCount = isLike == 1 ? dataList[0].votecnt +1 : dataList[0].votecnt - 1;
     this.setState((prevState) => ({
      allIdeaList: prevState.allIdeaList.map((item: any) =>
        item.ideaid === ideaId
          ? {
            ...item,
            uservote: isLike,
            userbookmark: isbookmarked,
            votecnt : voteCount

          } // Add translatedText for the matched item
          : item // Keep the other items unchanged
      )
    }));
      //this.getallIdeasforexplore(0, '', 'ALL');
    }

  }
  public submitComment = async (ideaId: any, commentID: any = 0, action: any = "ADD", ideaOwner: any = "", ideaTitle: any = "") => {
    debugger;
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
      if (action == "commenthide") {
        this.callPowerAutomate(
          ideaId,
          this.state.automateTitle,
          this.state.automateOwner,
          this.state.automateComment,
          user.userName
        );
      }
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
      this.getIdeaComment(ideaId);
      //.getAllIdeas(0, this.state.filterName)
      this.getallIdeasforexplore(0, '', 'ALL');
    }

  }
  public editComment(comment: any, commentID: number = 0, ideaID: any = 0) {

    this.setState({
      comment: comment,
      editID: commentID,
      ideaID: ideaID
    });
  }
  public submitVoteForComment = async (ideaId: any, commentId: any, isLike: string) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let params = {
      IDEACOMMENTID: commentId,
      IDEAID: ideaId,
      userid: user.prno,
      isLike: isLike,
      submitteremailid: user.prno,
      submittername: user.prno,
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
  public toggleCommentShow = (ideaId: any) => {
    this.setState(prevState => ({
      isCommentShow: {
        ...prevState.isCommentShow,
        [ideaId]: !prevState.isCommentShow[ideaId]
      }
    }));
    this.getIdeaComment(ideaId);
  };


  public getIdeaComment = async (ideaId: any) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getMyChallenge", user.userName)
    let params = {
      userid: user.prno,
      IDEAID: ideaId
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
    apiResponse = await this.IdeationServices.getData(params, headers, "getIdeaComments");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    this.setState({ commentList: [] })
    for(let i=0; i<dataList.length;i++){
      dataList[i].original = true;
      //dataList[i].translated = false;
    }
    if (dataList.length > 0) {
      console.log("commentList", dataList);
      let isCommentMoreTwo = dataList.length > 2 ? true : false;
      // Slice the first 2 comments initially
      const initialComments = dataList.slice(0, 2);

      this.setState(prevState => ({
        commentList: initialComments,
        isCommentLoadMore: isCommentMoreTwo,
        allCommentList: dataList,
        comment: ""
      }));
      console.log("commentList", this.state.commentList);
    }

  }
  loadMoreComments = (ideaId: any) => {
    const currentComments = this.state.commentList;
    const remainingComments = this.state.allCommentList.slice(0, currentComments.length + 2);

    this.setState({
      commentList: remainingComments
    });
    if (this.state.allCommentList.length == remainingComments.length) {
      this.setState({
        isCommentLoadMore: false
      });
    }
  }
  public getIdeaCommentVoteAndReplyCount = async (commentID: any) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getMyChallenge", user.userName)
    let params = {
      userid: user.prno,
      commentid: commentID
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
    apiResponse = await this.IdeationServices.getData(params, headers, "getrepliescountforcomment");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("commentList", dataList);

      this.setState({
        commentList: dataList
      })

    }

  }
  public onChangeComment(e: any, selctedOptions: any) {
    this.setState({
      comment: selctedOptions
    });
  }
  public handleKeyPress = (e: any, ideaID: any, ideaTitle: any, ideaOwner: any) => {
    if (e.key === 'Enter') {
      if (this.state.comment == "") {
        return false;
      }
      // this.setState({editID:0})
      this.submitComment(ideaID, 0, 'ADD', ideaOwner, ideaTitle);
      //this.getallIdeasforexplore(0, '', this.state.topFilter);
    }
  }

  public async getAttachment() {
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
  fetchAttachmentsForAllIdeas = async () => {
    for (const idea of this.state.allIdeaList) {
      await this.fetchAttachmentsForIdea(idea.ideaid);
    }
  };

  fetchAttachmentsForIdea = async (ideaId: number) => {
    try {
      const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
      let allItems: any[] = [];
      let nextLink: string | null = null;

      const fetchItems = async (url: string) => {
        const response: any = await web.lists.getByTitle("IdeaAttachments")
          .items
          .filter(`IdeaID eq ${ideaId}`)
          .expand('AttachmentFiles')
          .top(100)
          .getPaged();
        console.log("IdeaAttachments Response", response);
        allItems = allItems.concat(response.results);
        nextLink = response.hasNext ? response.getNext() : null;

        if (nextLink) {
          await fetchItems(nextLink);
        }
      };

      await fetchItems(`https://dewa.sharepoint.com/sites/qaideation/_api/web/lists/getByTitle('IdeaAttachments')/items?$filter=IdeaID eq ${ideaId}&$expand=AttachmentFiles`);

      let attachmentFiles = allItems;
      let imageURLList: any = [];
      if (attachmentFiles.length > 0) {
        let attachmentPath = "Lists/IdeaAttachments/Attachments/";
        for (let i = 0; i < attachmentFiles.length; i++) {
          if (attachmentFiles[i].Title.includes('jpg') ||
            attachmentFiles[i].Title.includes('jpeg') ||
            attachmentFiles[i].Title.includes('png')) {
            imageURLList.push([{
              imageUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${attachmentFiles[i].Id}/${attachmentFiles[i].Title}`,
              IdeaID: ideaId,
              pdfUrl: '',
              videoUrl: ''
            }])
          }
          else if (attachmentFiles[i].Title.includes('pdf')) {
            imageURLList.push([{
              imageUrl: `${hbanner10}`,
              IdeaID: ideaId,
              pdfUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${attachmentFiles[i].Id}/${attachmentFiles[i].Title}`,
              videoUrl: ''
            }])
          }
          else if (attachmentFiles[i].Title.includes('mp4') ||
            attachmentFiles[i].Title.includes('mov')
          ) {
            imageURLList.push([{
              imageUrl: '',
              IdeaID: ideaId,
              pdfUrl: '',
              videoUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${attachmentFiles[i].Id}/${attachmentFiles[i].Title}`
            }])
          }
        }
        // imageURLList = attachmentFiles.map(item => ({
        //  imageUrl: `https://dewa.sharepoint.com/sites/qaideation/${attachmentPath}${item.Id}/${item.Title}`,
        // IdeaID: item.IdeaID
        // }));
      }
      else {
        imageURLList.push([{
          imageUrl: `${hbanner10}`,
          pdfUrl: '',
          videoUrl: '',
          IdeaID: ideaId
        }])
      }


      this.setState((prevState => ({
        attachments: {
          ...prevState.attachments,
          [ideaId]: imageURLList
        }
      })));
    } catch (error) {
      console.error(`Error fetching attachments for idea ${ideaId}:`, error);
    }
  };
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
  private closeSuccessDialog = () => {
    this.setState({ isSuccessDialogVisible: false });

  };
  // private openErrorDialog = () => {
  //   this.setState({ isDialogVisible: true });
  // };

  private closeErrorDialog = () => {
    this.setState({ isDialogVisible: false });
  };
  public submitBookmark = async (ideaId: any, isLike: any, isDisLike: any, isBookmark: any) => {
    debugger;
    this.setState({ isBookmarkModalOpen: true })
    let apiResponse: any;
    let responseData: any = [];
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
    apiResponse = await this.IdeationServices.postData(params, headers, "SubmitVote");
    responseData = apiResponse.data;
    if (responseData.data.respcode > 0) {
      console.log("SubmitVote Res", responseData.data);
      if (isBookmark == 0) {
        this.setState({ bookMarkClass: "modal fade show", bookMarkDesc: 'Bookmarks Removed' })
      }
      if (isBookmark == 1) {
        this.setState({ bookMarkClass: "modal fade show", bookMarkDesc: 'Added to your Bookmarks' })
      }
      this.setState((prevState) => ({
        allIdeaList: prevState.allIdeaList.map((item: any) =>
          item.ideaid === ideaId
            ? {
              ...item,
              userbookmark: isBookmark
  
            } // Add translatedText for the matched item
            : item // Keep the other items unchanged
        )
      }));

     // this.getallIdeasforexplore(0, '', 'ALL');

    }

  }
  public removeBookmark = async (ideaId: any, isLike: any, isDisLike: any) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let params = {
      ideaid: ideaId,
      userid: user.prno,
      idealike: isLike,
      ideadislike: isDisLike,
      suggestions: "",
      shareidea: "0",
      bookmark: "0",
      submitteremailid: user.prno,
      submitterusername: user.prno
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
    apiResponse = await this.IdeationServices.postData(params, headers, "SubmitVote");
    responseData = apiResponse.data;
    if (responseData.data.respcode > 0) {
      console.log("SubmitVote Res", responseData.data);
      //this.getallIdeasforexplore(0, this.state.filterName, this.state.topFilter);
      this.setState((prevState) => ({
        allIdeaList: prevState.allIdeaList.map((item: any) =>
          item.ideaid === ideaId
            ? {
              ...item,
              userbookmark: 0
  
            } // Add translatedText for the matched item
            : item // Keep the other items unchanged
        )
      }));
    }

  }
  public onChangeTargetDivision(e: any, selctedOptions: any) {
    this.setState({
      selectedTargetDivisionKey: selctedOptions.key,
      selectedTargetDivisionText: selctedOptions.text,

    })
  }
  public onChangeBenifits(e: any, selctedOptions: any) {
    this.setState({
      selectedBenifitsKey: selctedOptions.key,
      selectedBenifitsText: selctedOptions.text,

    })

  }
  public onChangeIdeaPath(e: any, selctedOptions: any) {

    this.setState({
      selectedIdeaPathKey: selctedOptions.key,
      selectedIdeaPathText: selctedOptions.text,

    })

  }

  public onChangeInnovationEnablers(e: any, selctedOptions: any) {
    this.setState({
      selectedInnovationEnablersKey: selctedOptions.key,
      selectedInnovationEnablersText: selctedOptions.text,

    })

  }
  public onChangeSearch(e: any, selctedOptions: any) {
    debugger;
    this.setState({
      searchText: selctedOptions,

    })
    if (selctedOptions != "") {
      let IdeaList = this.state.searchArrayList.filter((idea: any) => idea.ideatitle.toLowerCase().includes(selctedOptions.toLowerCase()));
      this.setState({
        allIdeaList: IdeaList,

      })
    }
    else {
      this.setState({
        allIdeaList: this.state.searchArrayList,

      })
    }
  }
  clearALLFilter() {
    this.setState({
      selectedTargetDivisionKey: "",
      selectedTargetDivisionText: "ALL",
      selectedBenifitsKey: "",
      selectedBenifitsText: "ALL",
      selectedIdeaPathKey: "",
      selectedIdeaPathText: "ALL",
      selectedInnovationEnablersKey: "",
      selectedInnovationEnablersText: "ALL",
    });
  }
  public toggleReplyCommentShow = (ideaCommentId: any, ideaItemId: any) => {
    debugger;
    this.setState(prevState => ({
      isReplyCommentShow: {
        ...prevState.isReplyCommentShow,
        [ideaCommentId]: !prevState.isReplyCommentShow[ideaCommentId]
      }
    }));
    this.getIdeaCommentReply(ideaCommentId, ideaItemId);
  };
  public getIdeaCommentReply = async (commentId: any, ideaItemId: any) => {
    console.log(ideaItemId);
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getMyChallenge", user.userName)
    let params = {
      userid: user.prno,
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
    this.setState(prevState => ({
      replyStage1CommentList: {
        ...prevState.replyStage1CommentList,
        [commentId]: dataList
      }
    }));
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("commentList", dataList);
      // Slice the first 2 comments initially
      //const initialComments = dataList.slice(0, 2);

      // this.setState(prevState => ({
      //   commentList: initialComments,
      //   allReplyCommentList: dataList,
      //   comment: ""
      // }));
      // this.setState({ replyStage1CommentList: dataList })
      this.setState(prevState => ({
        replyStage1CommentList: {
          ...prevState.replyStage1CommentList,
          [commentId]: dataList
        }
      }));
      this.getIdeaComment(ideaItemId);
    }

  }
  // public SubmitReplyForIdeaComment = async (ideaCommentId: any, replyCommentID: any = 0,ideaId:any, action: any = "ADD", ideaOwner: any = "", ideaTitle: any = "") => {
  //   debugger;
  //   let apiResponse: any;
  //   let responseData: any = [];
  //   let commentToSave:any;
  //   let struser: any = localStorage.getItem('userinfo');
  //   let user = JSON.parse(struser);
  //   replyCommentID = this.state.CommentReplyId == 0 ? replyCommentID : this.state.CommentReplyId;
  //   if(action != 'DELETE' && action != 'replyhide'){
  //   action = this.state.ideaReply2CommentId == 0 ? action : "UPDATE";}
  //   commentToSave = this.state.ideaReply2CommentId == 0 ? this.state.replyComment : this.state.editReplyComment;
  //   let params = {
  //     IDEACOMMENTID:ideaCommentId,
  //     IDEAID: ideaId,
  //     repliesid:replyCommentID,
  //     userid: user.userName,
  //     comment: commentToSave,
  //     submitteremailid: user.userEmailID,
  //     submittername: user.userName,
  //     action: action
  //   }

  //   const headers = {
  //     'headers': {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       //'Authorization': `Bearer ${this.state.token}`
  //     }
  //   };
  //   apiResponse = await this.IdeationServices.postData(params, headers, "SubmitReplyForIdeaComment");
  //   responseData = apiResponse.data;
  //   if (responseData.data.respcode > 0) {
  //     if (action == "ADD") {
  //       this.insertNotification("Commented on your idea - " + ideaTitle, "Comment", ideaId, ideaOwner, "Explore");
  //     }
  //     if (action == "replyhide") {
  //     this.callPowerAutomate(
  //       ideaId,
  //       this.state.automateTitle,
  //       this.state.automateOwner,
  //       this.state.automateComment,
  //       user.userName
  //     );}
  //     if (action == "UPDATE" || action == "replyhide") {
  //       this.setState(prevState => ({
  //         isReply2ShowtextBox: {
  //           ...prevState.isReply2ShowtextBox,
  //           [replyCommentID]: !prevState.isReply2ShowtextBox[replyCommentID]
  //         },
  //         //editComment:editComment
  //       }));
  //     console.log("SubmitReplyForIdeaComment Res", responseData.data);
  //     this.setState({
  //       replyComment: ""
  //     });}


  //   }
  //   this.getIdeaCommentReply(ideaCommentId,ideaId)
  //   //.getIdeaReplyComment(ideaCommentId);
  // }
  public SubmitReplyForIdeaComment = async (ideaCommentId: any, replyCommentID: any = 0, ideaId: any, action: any = "ADD", ideaOwner: any = "", ideaTitle: any = "") => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let commentToSave: any;
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    replyCommentID = this.state.CommentReplyId == 0 ? replyCommentID : this.state.CommentReplyId;
    if (action != 'DELETE' && action != 'replyhide' && action != "ADD") {
      action = this.state.ideaReply2CommentId == 0 ? action : "UPDATE";
    }

    commentToSave = this.state.ideaReply2CommentId == 0 ? this.state.replyStage1Comment : this.state.editReplyComment;
    let params = {
      IDEACOMMENTID: ideaCommentId,
      IDEAID: ideaId,
      repliesid: replyCommentID,
      userid: user.prno,
      comment: commentToSave,
      submitteremailid: user.prno,
      submittername: user.prno,
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
      if (action == "replyhide") {
        this.callPowerAutomate(
          ideaId,
          this.state.automateTitle,
          this.state.automateOwner,
          this.state.automateComment,
          user.userName
        );
      }
      if (action == "UPDATE" || action == "replyhide") {
        this.setState(prevState => ({
          isReply2ShowtextBox: {
            ...prevState.isReply2ShowtextBox,
            [replyCommentID]: !prevState.isReply2ShowtextBox[replyCommentID]
          },
          //editComment:editComment
        }));
        console.log("SubmitReplyForIdeaComment Res", responseData.data);
        this.setState({
          replyStage1Comment: ""
        });
      }


    }
    this.setState({
      replyStage1Comment: '',
      editReplyComment: '', ideaReply2CommentId: 0
    })
    this.getIdeaCommentReply(ideaCommentId, ideaId)


    //this.getIdeaReplyComment(ideaCommentId,"callFromSubmitReply");
  }

  public insertNotification = async (notificationTitle: any, status: any, ideaId: any, ideaOwner: any, pageAction: any) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let params = {
      userid: user.prno,
      notificationTitle: notificationTitle,
      status: status,
      useremailID: user.prno,
      submitteremailid: user.prno,
      submittername: user.prno,
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
  public onChangeReplyComment(e: any, selctedOptions: any) {
    debugger;
    this.setState({
      replyStage1Comment: selctedOptions
    });
  }
  public handleKeyPressReplyComment = (e: any, commentID: any, ideaItemId: any, title: any, owner: any) => {
    debugger;
    if (e.key === 'Enter') {
      if (this.state.replyStage1Comment == "") {
        return false;
      }
      this.SubmitReplyForIdeaComment(commentID, 0, ideaItemId, 'ADD', owner, title);
    }
  }

  public toggleReplyShowtextBox = (editComment: any, ideaCommentId: any) => {
    this.setState(prevState => ({
      isReplyShowtextBox: {
        ...prevState.isReplyShowtextBox,
        [ideaCommentId]: !prevState.isReplyShowtextBox[ideaCommentId]
      },
      editComment: editComment
    }));
  };
  public onChangeEditComment(e: any, selctedOptions: any) {
    this.setState({
      editComment: selctedOptions
    });
  }
  public handleKeyPressEditComment = (e: any, ideaId: any, commentId: any) => {
    if (e.key === 'Enter') {
      if (this.state.editComment == "") {
        return false;
      }
      this.setState({
        editID: commentId
      })
      //submitComment = async (ideaId: any, commentID: any = 0, action:
      this.submitComment(ideaId, commentId, 'UPDATE');
    }
  }

  reportComment = () => {
    this.submitComment(this.state.reportIdeaId, this.state.reportCommentId, "commenthide");
    this.closestage1CommentReportDialog();
  }
  closestage1CommentReportDialog = () => {
    this.setState({ stage1CommentReportDialog: false })
  }
  reportStage2CommentId(ideaId: any, commentId: any, repliesId: any, ideatitle: any, owner: any, comment: any) {
    this.setState({
      reportIdeaId: ideaId, reportCommentId: commentId,
      stage2CommentReportDialog: true, reportRepliesId: repliesId,
      automateTitle: ideatitle, automateOwner: owner, automateComment: comment
    })
  }
  reportStage2Comment = () => {
    this.SubmitReplyForIdeaComment(this.state.reportIdeaId, this.state.reportCommentId, this.state.reportRepliesId, "replyhide");
    this.closestage2CommentReportDialog();
  }
  closestage2CommentReportDialog() {
    this.setState({ stage2CommentReportDialog: false })
  }
  public onChangeReplyEditComment(e: any, selctedOptions: any) {
    this.setState({
      editReplyComment: selctedOptions
    });
  }
  public handleKeyPressReplyEditComment = (e: any, ideaCommentId: any, CommentReplyId: any) => {
    if (e.key === 'Enter') {
      if (this.state.editReplyComment == "") {
        return false;
      }
      // this.setState({
      //   ideaReply2CommentId:ideaCommentId,
      //   CommentReplyId:CommentReplyId
      // })
      this.SubmitReplyForIdeaComment(ideaCommentId, CommentReplyId, 0, "UPDATE")

    }
  }
  public toggleEditReplyShowtextBox = (ideaCommentId: any, CommentReplyId: any, comments: any) => {

    debugger;
    this.setState(prevState => ({
      isReply2ShowtextBox: {
        ...prevState.isReply2ShowtextBox,
        [CommentReplyId]: !prevState.isReply2ShowtextBox[CommentReplyId]
      },
      ideaReply2CommentId: ideaCommentId,
      CommentReplyId: CommentReplyId,
      editReplyComment: comments
    }));
  };
  reportCommentId(ideaId: any, commentId: any, ideaTitle: any, owner: any, comments: any) {
    this.setState({
      reportIdeaId: ideaId, reportCommentId: commentId,
      stage1CommentReportDialog: true, automateTitle: ideaTitle, automateOwner: owner,
      automateComment: comments
    })
  }
  public async callPowerAutomate(
    p_ideaID: any,
    p_ideaTitle: any,
    p_ideaOwner: any,
    p_comment: any,
    reporter: any
  ) {
    try {
      let struser: any = localStorage.getItem("userinfo");
      let user = JSON.parse(struser);
      let loggedInUserId = user.userEmailID;
      let loggedInUser = user.userName;
      // Define your parameters
      const ideaID = p_ideaID;
      const ideaTitle = p_ideaTitle;
      const ideaOwner = p_ideaOwner;
      const comment = p_comment;
      const reportedUser = reporter;
      let url: any = "";

      url = `https://prod-23.uaenorth.logic.azure.com:443/workflows/e78edf52a2b5453190fcc55354aa8464/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hX9bxY4Eqozl6zIZZl-JwmZrvmmpYPR387kK7px9NyU&ideaID=${ideaID}&ideaTitle=${ideaTitle}&ideaOwner=${ideaOwner}&comment=${comment}&reportedUser=${reportedUser}&loggedInUser=${loggedInUser}&loggedInUserId=${loggedInUserId}`;

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
  redirectInnerPage(id: any) {
    console.log(id)
    window.location.replace("https://dewa.sharepoint.com.mcas.ms/sites/qaideation/SitePages/IdeaInnerPage.aspx?ideaID=" + id);
  }
  handleCopy(id: any, isLike: string, isDisLike: any, ideaOwner: any, ideaTitle: any, isbookmarked: any, isShare: any) {
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
    this.submitVote(id, isLike, isDisLike, ideaOwner, ideaTitle, isbookmarked, isShare)
  }
  redirectToMessage(id: any, isLike: string, isDisLike: any, ideaOwner: any, ideaTitle: any, isbookmarked: any, isShare: any) {
    this.submitVote(id, isLike, isDisLike, ideaOwner, ideaTitle, isbookmarked, isShare)
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
    window.location.replace("https://dewa.sharepoint.com.mcas.ms/sites/qaideation/SitePages/Messages.aspx");
  }
  closeModal() {
    this.setState({ modalClass: 'modal fade e-backdrop', modalTime: 1 });
    this.getallIdeasforexplore(0, '', 'ALL');
  }
  handleDownload(url: any) {
    console.log(url);
    window.open(url, '_blank');
  }

  openDropdown() {
    this.setState({ dropdownClass: 'dropdown-menu show' })
  }

  seeOrginal(text: any, ideaId: any,orgboo:any, by:any, commentid:any=0) {
    let org = orgboo == true? false:true;
    if(by == "byidea"){
    this.setState((prevState) => ({
      allIdeaList: prevState.allIdeaList.map((item: any) =>
        item.ideaid === ideaId
          ? {
            ...item, translatedText: text,
            ideatitle: item.translatedText,
            original:org
          } // Add translatedText for the matched item
          : item // Keep the other items unchanged
      )
    }));
    console.log(this.state.allIdeaList);
  }

  if(by == "bycomments"){
    this.setState((prevState) => ({
      commentList: prevState.commentList.map((item: any) =>
        item.ideaid == ideaId && item.commentid == commentid
          ? {
            ...item, translatedText: text,
            comments: item.translatedText,
            original:org
          } // Add translatedText for the matched item
          : item // Keep the other items unchanged
      )
    }));
    this.setState((prevState) => ({
      allCommentList: prevState.allCommentList.map((item: any) =>
        item.ideaid == ideaId && item.commentid == commentid
          ? {
            ...item, translatedText: text,
            comments: item.translatedText,
            original:org
          } // Add translatedText for the matched item
          : item // Keep the other items unchanged
      )
    }));
    console.log(this.state.allCommentList);
  }

  }
  public async callPowerAutomateForTranslate(text: any, ideaId: any,  orgboo:any, by:any, commentid:any=0) {
    try {
      debugger;


      let url: any = "";

      // url = `https://prod-07.uaenorth.logic.azure.com:443/workflows/a2140ce371ed41b79bac3f97ac365e26/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FtsywPVNPhaamUrExr9mOy2Bf9BbyzKVoBLAk8WBM58&text=${text}`;
      url = `https://prod-07.uaenorth.logic.azure.com/workflows/a2140ce371ed41b79bac3f97ac365e26/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FtsywPVNPhaamUrExr9mOy2Bf9BbyzKVoBLAk8WBM58&text=${text}`;
      // Make the GET request
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(resp);

      // Check if the request was successful
      if (resp.ok) {
        const result = await resp.json();
        // alert("Successfully Flow triggered");
        console.log(result);
        let org = orgboo == true? false:true;
        // Now, update the state to reflect the changes
        if(by == "byidea"){
        this.setState((prevState) => ({
          allIdeaList: prevState.allIdeaList.map((item: any) =>
            item.ideaid === ideaId
              ? {
                ...item, translatedText: text,
                ideatitle: result.translatedText,
                original:org
              } // Add translatedText for the matched item
              : item // Keep the other items unchanged
          )
        }));
        console.log(this.state.allIdeaList);
      }

      if(by == "bycomments"){
        this.setState((prevState) => ({
          commentList: prevState.commentList.map((item: any) =>
            item.ideaid == ideaId && item.commentid == commentid
              ? {
                ...item, translatedText: text,
                comments: result.translatedText,
                original:org
              } // Add translatedText for the matched item
              : item // Keep the other items unchanged
          )
        }));
        this.setState((prevState) => ({
          allCommentList: prevState.allCommentList.map((item: any) =>
            item.ideaid === ideaId && item.commentid === commentid
              ? {
                ...item, translatedText: text,
                comments: result.translatedText,
                original:org
              } // Add translatedText for the matched item
              : item // Keep the other items unchanged
          )
        }));
        // this.setState(prevState => ({
        //   commentList: this.initialComments,
        //   isCommentLoadMore: this.isCommentMoreTwo,
        //   allCommentList: this.commentdatalist,
        //   comment: ""  }));
        console.log("commentList", this.state.commentList);
      }
       
    } else {
        // Handle HTTP error status
        console.error(`Error: ${resp.status} - ${resp.statusText}`);
      }

      //console.log(userEmailID);
    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
    }
  }

  public render(): React.ReactElement<IAfkExploreProps> {
// const langText = this.state.lang === "en" ? en : ar;
const langText = this.state.lang === "en" ? this.state.englishContent:this.state.arabicContent;

    return (
      <div className="col-lg-12 afk-explore">
        <div className={this.state.class}>
          <div className="row">
            <div className="col-lg-12 input-search mb-3">
              <SearchBox
                className="f-search"
                onChange={(e, selctedOptions) => this.onChangeSearch(e, selctedOptions)}
                placeholder={langText.searchbyideatitle}
                showIcon
              />
              <div
                className="filter-icon"
                data-bs-toggle="modal"
                data-bs-target="#SubmitIdea"
              >
                <div className="cursor-pointer">
                  <img
                    src={Filtericon}
                    alt="filter-icon"
                    width="24"
                    height="24"
                  />
                 {/*<span className="badge bg-danger">{langText.nine}</span>*/}
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade e-backdrop"
            id="SubmitIdea"
            aria-labelledby="SubmitIdeaLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-e modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header pb-0">
                  <div className="row">
                    <h1
                      className="modal-title fs-5 col-lg-12 float-start"
                      id="exampleModalLabel"
                    >
                      {langText.filterideas}
                    </h1>
                    <p className="col-lg-12 float-start">
                      {langText.keyideas}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-top"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.clearALLFilter()}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-12 p-0">
                          <div className="form-floating mb-3">
                            
                              <Dropdown
                                className="form-select01 label-targetdivision"
                                //placeholder={langText.selectanoption1}
                                //label={langText.targetdivision}
                                options={this.state.targetDivisionList}
                                selectedKey={this.state.selectedTargetDivisionKey}
                                onChange={(e, selctedOptions) => this.onChangeTargetDivision(e, selctedOptions)}
                                styles={dropdownStyles}
                              />
                            
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 p-0">
                          <div className="form-floating mb-3">
                            
                              <Dropdown
                                className="form-select01 label-benefit"
                                //placeholder={langText.selectanoption1}
                                //label={langText.benefit}
                                options={this.state.benifitsList}
                                selectedKey={this.state.selectedBenifitsKey}
                                onChange={(e, selctedOptions) => this.onChangeBenifits(e, selctedOptions)}
                                styles={dropdownStyles}
                              />
                            
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 p-0">
                          <div className="form-floating mb-3">
                            
                              <Dropdown
                                className="form-select01 label-ideapath"
                                //placeholder={langText.selectanoption1}
                                //label={langText.ideapath}
                                options={this.state.ideaPathList}
                                selectedKey={this.state.selectedIdeaPathKey}
                                onChange={(e, selctedOptions) => this.onChangeIdeaPath(e, selctedOptions)}
                                styles={dropdownStyles}
                              />
                           
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 p-0">
                          <div className="form-floating mb-3">
                           
                              <Dropdown
                                className="form-select01 label-innovationenablers"
                                //placeholder={langText.selectanoption1}
                                //label={langText.innovationenablers1}
                                options={this.state.innovationEnablersList}
                                selectedKey={this.state.selectedInnovationEnablersKey}
                                onChange={(e, selctedOptions) => this.onChangeInnovationEnablers(e, selctedOptions)}
                                styles={dropdownStyles}
                              />
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer pt-0 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary m-btn"
                   // data-bs-dismiss="modal"
                    onClick={() => this.clearALLFilter()}
                  >
                    {langText.clearall}
                  </button>
                  <button onClick={() => this.getallIdeasforexplore(0, this.state.filterWithCase, this.state.topFilter, this.state.filterWithCase)} type="button" className="btn btn-primary m-btn"
                    data-bs-dismiss="modal">
                    {langText.apply}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 p-1 clearfix">
              <span className={this.state.topFilter == 'ALL' ? "e-badge-green ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light" : "e-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light"}>
                <span>
                  <a aria-current="page" onClick={() => this.getallIdeasforexplore(0, "", 'ALL')}>
                    {langText.all}
                  </a>
                </span>
              </span>
              <span className={this.state.topFilter == 'Core' ? "e-badge-green ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light" : "e-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light"}>
                <span>
                  <a aria-current="page" onClick={() => this.getallIdeasforexplore(0, "", 'Core')}>
                    {langText.core}
                  </a>
                </span>
              </span>
              <span className={this.state.topFilter == 'Adjacent' ? "e-badge-green ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light" : "e-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light"}>
                <span>
                  <a aria-current="page" onClick={() => this.getallIdeasforexplore(0, "", 'Adjacent')}>
                    {langText.adjacent}
                  </a>
                </span>
              </span>
              <span className={this.state.topFilter == 'Beyond' ? "e-badge-green ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light" : "e-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light"}>
                <span>
                  <a aria-current="page" onClick={() => this.getallIdeasforexplore(0, "", 'Beyond')}>
                    {langText.beyond}{" "}
                  </a>
                </span>
              </span>
              <span className={this.state.topFilter == 'Technologies General' ? "e-badge-green ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light" : "e-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light"}>
                <span>
                  <a aria-current="page" onClick={() => this.getallIdeasforexplore(0, "", 'Technologies General')}>
                    {langText.technologiesgeneral}{" "}
                  </a>
                </span>
              </span>
              <span className={this.state.topFilter == 'Triple Bottom line' ? "e-badge-green ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light" : "e-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light"}>
                <span>
                  <a aria-current="page" onClick={() => this.getallIdeasforexplore(0, "", 'Triple Bottom line')}>
                    {langText.triplebottomline}{" "}
                  </a>
                </span>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 position-relative">
              <hr className="border-topr" />
              <div className="small-drop">
                <div className="dropdown drop-white-space d-flex align-items-center">
                  {langText.sortby}
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    id="dropdownMenuButtonsmalldrop"
                    onClick={() => this.openDropdown()}
                  >
                    <strong>{this.state.filterWithCase}</strong>
                    <div className={this.state.dropdownClass} aria-labelledby="dropdownMenuButtonsmalldrop">
                    <a onClick={() => this.getallIdeasforexplore(0, "RECENT", this.state.topFilter, this.state.recent)} className="dropdown-item" >
                      {" "}
                      {langText.recent}
                    </a>
                    <hr className="dropdown-divider" role="separator" />
                    <a onClick={() => this.getallIdeasforexplore(0, "IMPLEMENTED", this.state.topFilter, this.state.implemented)} className="dropdown-item" >
                      {" "}
                      {langText.implemented}
                    </a>
                    <hr className="dropdown-divider" role="separator" />
                    <a onClick={() => this.getallIdeasforexplore(0, "LATEST SUBMISSIONS", this.state.topFilter, this.state.latestsubmissions)} className="dropdown-item" href="#">
                      {" "}
                      {langText.latestsubmissions}
                    </a>
                    <hr className="dropdown-divider" role="separator" />
                    <a onClick={() => this.getallIdeasforexplore(0, "OLD SUBMISSIONS", this.state.topFilter, this.state.oldsubmissions)} className="dropdown-item" href="#">
                      {" "}
                      {langText.oldsubmissions}
                    </a>
                    <hr className="dropdown-divider" role="separator" />
                    <a onClick={() => this.getallIdeasforexplore(0, "MOST LIKED", this.state.topFilter, this.state.mostliked)} className="dropdown-item" href="#">
                      {" "}
                      {langText.mostliked}
                    </a>
                    <hr className="dropdown-divider" role="separator" />
                    <a onClick={() => this.getallIdeasforexplore(0, "MOST COMMENTS", this.state.topFilter, this.state.mostcomments)} className="dropdown-item" href="#">
                      {" "}
                      {langText.mostcomments}
                    </a>
                  </div>
                  </a>
                
                </div>
              </div>
            </div>
          </div>

          {this.state.allIdeaList.length ==0 && (
       <div className="no-data-section">
                          <div className="row m-0">
                            <div className="col-lg-12 p-0 position-relative">
                              <h3 className="load-more-green text-center">
                                <a>{langText.nodata}</a>
                              </h3>
                            </div>
                          </div>
                        </div>

)}

          {this.state.allIdeaList.length > 0 && (
            <div>
              {this.state.allIdeaList.map((item: any) => (
                <div className="row mt-4" key={item.ideaid} >
                  <div className="col-lg-12 position-relative">
                    <div className="h-border-box-outline">
                      <div className='h-border-box-hover-grey'>
                      <div className="col-lg-12 p-0 cursor-pointer" onClick={() => this.redirectInnerPage(item.ideaid)}>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            {this.state.profileAttachments[item.ideaowner] && this.state.profileAttachments[item.ideaowner].map((attachment: profileAttachment) => (
                              <img
                                className="profile-img03"
                                src={attachment.imageUrl}
                                alt="user pic"
                              />))}
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="row">
                              <div className="col-lg-8">
                                {this.state.designationList[item.ideaowner] && this.state.designationList[item.ideaowner].map((item: userDesignation) => (
                                  <h4 className="profile-name-text01">{item.name}</h4>
                                ))}
                                {this.state.designationList[item.ideaowner] && this.state.designationList[item.ideaowner].map((item: userDesignation) => (
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
                                  <span className="ms-2 mt-1 float-start">{this.formatDate(item.enteredon)}</span>{" "}
                                  {/* <span className="mt-1 float-start">
                                  .ID: {this.getYearFromDate(item.enteredon)}-{item.ideaid}
                                </span> */}
                                </h5>
                              </div>
                              <div className="col-lg-4">
                                <div className="float-end">
                                  <button className="tt-a">
                                    <span className="cursor-pointer badge rounded-pill text-dark bg-success">
                                      <img
                                        src={Implementedthumbsicon}
                                        alt="edit-icon"
                                        width="14"
                                        height="14"
                                      />
                                      <span className="ms-1">
                                        <a aria-current="page" href="#">
                                          {/* Implemented */}
                                          {this.state.filterWithCase}
                                        </a>
                                      </span>
                                    </span>
                                  </button>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 p-0  cursor-pointer" onClick={() => this.redirectInnerPage(item.ideaid)}>
                        <h3 className="h-idea-heading">
                          
                          <span className='rcs-text'>{item.ideatitle}</span>
                          {item.original && (
                                <span className='trans-text' onClick={() => this.callPowerAutomateForTranslate(item.ideatitle, item.ideaid, item.original,"byidea")}>{langText.seetranslation}</span>)}
                                 {!item.original && ( 
                                <span className='trans-text' onClick={() => this.seeOrginal(item.ideatitle, item.ideaid, item.original,"byidea")}>{langText.seeoriginal}</span>)}
                           
                        </h3>
                      </div>
                      <div className="col-lg-12 p-0  cursor-pointer" onClick={() => this.redirectInnerPage(item.ideaid)}>
                        <ul className='himage-gallery'>

                          {/* {(await this.getAttachmentById(item.ideaid)).map((imageURL: any, index: any) => ( */}
                          {/* {this.getImageURL(item.ideaid).map((imageURL: any, index: any) => (
  <li>
    <img key={index} src={imageURL} alt={`Image ${index + 1}`} className="img-fluid mt-1 banner-img" />
  </li>
))} */}
                          {this.state.attachments[item.ideaid] && this.state.attachments[item.ideaid].map((attachment: any) => (
                            <>
                              {attachment.map((attachment: any) => (
                                <li>
                                  {attachment.imageUrl != '' && (
                                    <img key={attachment.imageUrl} src={attachment.imageUrl} alt="attachment" />
                                  )}

                                  {attachment.videoUrl != '' && (

                                    <ReactPlayer
                                      url={attachment.videoUrl}
                                      width="100%"
                                      height="100%"
                                      controls={true}
                                    />

                                  )}
                                </li>

                              ))}</>

                          ))}
                        </ul>
                      </div>

                      {/* download icon comes here */}
                      <div className="col-lg-12">
                        <ul className='download-sec-container'>
                          {this.state.attachments[item.ideaid] && this.state.attachments[item.ideaid].map((attachment: any) => (
                            <>
                              {attachment.map((attachment: any) => (
                                <li>
                                  {attachment.pdfUrl != '' && (
                                    <>
                                      {/* <img src={hbanner10} alt="attachment" /> */}
                                      <div className="col-lg-12 p-0 download-btn-section">
                                        <div className="row justify-content-center">
                                          <p className="col-4 vcs-text-dark text-center mt-3  mb-0 cursor-pointer">
                                            <img
                                              src={Downloadicon}
                                              //src={hbanner10}
                                              alt="edit-icon"
                                              width="20"
                                              height="20"
                                              className='downloadicon-img'
                                            />
                                            <span className="ms-2 text-green" onClick={() => this.handleDownload(attachment.pdfUrl)}>{langText.download}</span>
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </li>
                              ))}
                            </>
                          ))}
                        </ul>
                      </div>
                      {/* download icon comes here */}

                      {/* <div className="col-lg-12 mt-4-5">
                        <div className="clearfix">
                          <div className="float-end">
                            {item.votecnt < 2 && (
                              <p className="vcs-text me-3 float-start mb-0"> {item.votecnt} {langText.vote}</p>)}
                            {item.votecnt >= 2 && (
                              <p className="vcs-text me-3 float-start mb-0"> {item.votecnt} {langText.votes}</p>)}
                            {item.commentcnt < 2 && (
                              <p className="vcs-text me-3 float-start mb-0">
                                {item.commentcnt} {langText.comment}
                              </p>)}
                            {item.commentcnt >= 2 && (
                              <p className="vcs-text me-3 float-start mb-0">
                                {item.commentcnt} {langText.comment}
                              </p>)}
                            {item.sharecnt < 2 && (
                              <p className="vcs-text float-start mb-0"> {item.sharecnt} {langText.share}</p>)}
                            {item.sharecnt >= 2 && (
                              <p className="vcs-text float-start mb-0"> {item.sharecnt} {langText.shares}</p>)}

                          </div>
                        </div>
                      </div> */}

                      <div className="col-lg-12">
                        <hr className="border-topr" />
                      </div>
                      </div>

                       <div className='p16'>

                      <div className="col-lg-12">
                        <div className="clearfix">
                          <div className="float-start">
                            {item.uservote == "0" && (
                              <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">
                                {this.loggedInUser != item.submitteremailid && (
                                  <div onClick={() => this.submitVote(item.ideaid, "1", "0", item.enteredby, item.ideatitle, item.userbookmark, 0)} className="vote-icon">
                                    {/* <span>{langText.vote}</span> */}
                                    <span className="votechanging">vote ({item.votecnt})</span>
                                  </div>)}
                              </p>
                            )}
                            {item.uservote == "1" && (
                              <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">
                                {this.loggedInUser != item.submitteremailid && (
                                  <div onClick={() => this.submitVote(item.ideaid, "0", "1", item.enteredby, item.ideatitle, item.userbookmark, 0)} className="vote-green-icon">
                                    {/* <span>{langText.vote}d</span> */}
                                    <span className="votechanging">vote ({item.votecnt})</span>
                                  </div>)}
                              </p>
                            )}

                            <p onClick={() => this.toggleCommentShow(item.ideaid)} className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">
                              <img
                                src={Commenticon}
                                alt="edit-icon"
                                width="20"
                                height="20"
                              />
                              {/* <span className="ms-2">{langText.comment}</span> */}
                              <span className="ms-2">Comment ({item.commentcnt})</span>
                            </p>

                            <p className="vcs-text-dark float-start mb-0 cursor-pointer share-drop">
                              {/* <Dropdown>
                        <Dropdown.Toggle id="dropdown-recent">
                          <img
                            src={Shareicon}
                            alt="edit-icon"
                            width="20"
                            height="20"
                          />
                          <span className="ms-2">Share</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            <img
                              src={Sharecopylinkicon}
                              alt="edit-icon"
                              width="24"
                              height="24"
                            />
                            <span className="ms-2">Copy Link</span>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#/action-2">
                            <img
                              src={Sharesenddirectlinkicon}
                              alt="edit-icon"
                              width="24"
                              height="24"
                            />
                            <span className="ms-2">
                              {" "}
                              Send via Direct Message
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
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
                                  
                                  <span className="ms-2">share ({item.sharecnt})</span>
                                  <div className="dropdown-menu">
                                  <a className="dropdown-item" href="#">
                                    <img
                                      src={Sharecopylinkicon}
                                      alt="edit-icon"
                                      width="24"
                                      height="24"
                                    />
                                    <span className="ms-2" onClick={() => this.handleCopy(item.ideaid, item.uservote, !item.uservote, item.ideaowner, item.ideatitle, item.userbookmark, 1)}>{langText.copylink}</span>
                                  </a>
                                  <hr className="dropdown-divider" role="separator" />
                                  <a className="dropdown-item" href="#">
                                    <img
                                      src={Sharesenddirectlinkicon}
                                      alt="edit-icon"
                                      width="24"
                                      height="24"
                                    />
                                    <span className="ms-2" onClick={() => this.redirectToMessage(item.ideaid, item.uservote, !item.uservote, item.ideaowner, item.ideatitle, item.userbookmark, 1)}>
                                      {" "}
                                      {langText.sendviadirectmessage}
                                    </span>
                                  </a>
                                </div>
                                </a>
                               
                              </div>
                            </p>
                          </div>
                          <div className="float-end">
                            {item.userbookmark == "0" && (
                              <p className="vcs-text float-start mb-0 cursor-pointer" data-tip
                                data-for="BookmarkTip">
                                <a
                                  className="bookmarks-icon"
                                  onClick={() => this.submitBookmark(item.ideaid, item.uservote, !item.uservote, 1)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#Bookmarkmodal"
                                />
                              </p>
                            )}
                            {item.userbookmark == "1" && (
                              <p className="vcs-text float-start mb-0 cursor-pointer" data-tip
                                data-for="RemoveBookmarkTip">
                                <a
                                  className="bookmarks-icon-black"
                                  onClick={() => this.submitBookmark(item.ideaid, item.uservote, !item.uservote, 0)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#Bookmarkmodal"
                                />
                              </p>
                            )}
                            {item.userbookmark == "0" && (
                              <ReactTooltip id="BookmarkTip" place="top" effect="solid">
                                {langText.bookmark}
                              </ReactTooltip>)}
                            {item.userbookmark == "1" && (
                              <ReactTooltip id="RemoveBookmarkTip" place="top" effect="solid">
                                {langText.removebookmark}
                              </ReactTooltip>)}
                            <ReactTooltip id="ViewCampaignTip" place="top" effect="solid">
                              {langText.viewcampaign}
                            </ReactTooltip>
                          </div>
                        </div>
                      </div>
                      {this.state.isCommentShow[item.ideaid] && (
                        <div>
                          {item.submitteremailid != this.loggedInUser && (
                            <div className="col-lg-12 input-with-img">
                              <div className="mb-3 mt-4 input-group">
                                <span className="input-group-text" id="basic-addon1">
                                {this.userImageUrl != '' && (
                        <img
                          className="profile-img02"
                          src={this.userImageUrl}
                          alt="user pic"
                        />)}
                      {this.userImageUrl == '' && (
                        <img
                          className="profile-img02"
                          src={DummyProfileimg}
                          alt="user pic"
                        />)}
                                </span>
                                <TextField
                                  placeholder={langText.shareyourthoughts}
                                  className="form-control"
                                  value={this.state.comment}
                                  onChange={(e, newValue) =>
                                    this.onChangeComment(e, newValue)
                                  }
                                  onKeyPress={(e) => this.handleKeyPress(e, item.ideaid, item.ideatitle, item.ideaowner)}
                                />
                              </div>
                            </div>)}

                          {this.state.commentList.map((commentItem: any) => (

                            <div className="col-lg-12 position-relative" key={commentItem.commentid}>
                              <div className="h-border-box-reply">
                                <div className="col-lg-12 p-0">
                                  <div className="d-flex">
                                    <div className="flex-shrink-0">
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
                                          {this.state.designationList[commentItem.submitteremailid] && this.state.designationList[commentItem.submitteremailid].map((item: userDesignation) => (
                                            <h4 className="profile-name-text02">
                                              {item.name}
                                            </h4>))}
                                          {this.state.designationList[commentItem.submitteremailid] && this.state.designationList[commentItem.submitteremailid].map((item: userDesignation) => (
                                            <h5 className="grey-text03">
                                              {item.designation}
                                            </h5>))}
                                        </div>
                                        <div className="col-lg-4">
                                          <div className="float-end">
                                            <h5 className="grey-text03  float-start">{this.formatTimeElapsed(commentItem.enteredon)}</h5>
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
                                                  {this.loggedInUser.toLowerCase() == commentItem.submitteremailid.toLowerCase() && (
                                                      <>
                                                      <a onClick={() => this.submitComment(item.ideaid, commentItem.commentid, "DELETE", item.enteredby, item.ideatitle)} className="dropdown-item cursor-pointer" >
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
                                                      /></>)}
                                                  {this.loggedInUser.toLowerCase() == commentItem.submitteremailid.toLowerCase() && (
                                                  
                                                      <>
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
                                                      /></>)}
                                                  {this.loggedInUser.toLowerCase() != commentItem.submitteremailid.toLowerCase() && (
                                                    <a className="dropdown-item cursor-pointer" onClick={() => this.reportCommentId(item.ideaid, commentItem.commentid, item.ideatitle, item.ideaowner, commentItem.comments)}>
                                                      {langText.report}
                                                    </a>)}
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
                                     
                                      <span className='rcs-text'> {commentItem.comments}</span>
                                      {commentItem.original && (
                                               <span className='trans-text' onClick={() => this.callPowerAutomateForTranslate(commentItem.comments, item.ideaid, item.original,"bycomments",commentItem.commentid)}>{langText.seetranslation}</span>
                                            )}
                                            {!commentItem.original && (
                                            <span className='trans-text' onClick={() => this.seeOrginal(commentItem.comments, item.ideaid, item.original,"bycomments",commentItem.commentid)}>{langText.seeoriginal}</span>)}
                                        
                                    </h3>)}
                                  {(this.state.isReplyShowtextBox[commentItem.commentid] &&
                                    <TextField
                                      placeholder={langText.editcomment}
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      className="form-control"
                                      value={this.state.editComment}
                                      onChange={(e, newValue) => this.onChangeEditComment(e, newValue)}
                                      onKeyPress={(e) => this.handleKeyPressEditComment(e, item.ideaid, commentItem.commentid)}
                                    />)}
                                </div>

                                <div className="col-lg-12 mt-3">
                                  <div className="clearfix">
                                    <div className="float-start">
                                      {commentItem.uservotecount == "0" && (
                                        <p className="vcs-text-dark me-3 float-start mb-0 cursor-pointer">
                                          <div onClick={() => this.submitVoteForComment(item.ideaid, commentItem.commentid, "1")} className="vote-icon">
                                            <span >{commentItem.votecount}</span>
                                          </div>

                                        </p>
                                      )}
                                      {commentItem.uservotecount == "1" && (
                                        <p className="vcs-text-dark me-3 float-start mb-0 cursor-pointer">
                                          <div onClick={() => this.submitVoteForComment(item.ideaid, commentItem.commentid, "0")} className="vote-green-icon">
                                            <span>{commentItem.votecount}</span>
                                          </div>
                                        </p>
                                      )}
                                      {/* <p className="vcs-text-dark me-3 ms-3 float-start mb-0 cursor-pointer">
                                            <img
                                              src={Voteicon}
                                              alt="edit-icon"
                                              width="20"
                                              height="20"
                                            />
                                            <span className="ms-2">{commentItem.votecount}</span>
                                          </p> */}
                                      <p className="vcs-text-dark float-start mb-0 cursor-pointer" onClick={() => this.getIdeaCommentReply(commentItem.commentid, item.ideaid)}>
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
                                      <p className="vcs-text-dark float-start mb-0 cursor-pointer" onClick={() => this.toggleReplyCommentShow(commentItem.commentid, item.ideaid)}>
                                        <span className="ms-2">{langText.reply1}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* {this.state.isReplyCommentShow[commentItem.commentid] && ( */}
                              <div className="col-lg-12 padding-rpy">

                                {this.state.replyStage1CommentList[commentItem.commentid] && this.state.replyStage1CommentList[commentItem.commentid].map((replyStage1CommentItem: any) => (
                                  <div className="col-lg-12 position-relative mt-5">
                                    <div className="h-border-box-reply">
                                      <div className="col-lg-12 p-0">
                                        <div className="d-flex">
                                          <div className="flex-shrink-0">
                                            {this.state.profileAttachments[replyStage1CommentItem.submitteremailid] && this.state.profileAttachments[replyStage1CommentItem.submitteremailid].map((attachment: profileAttachment) => (
                                              <img
                                                className="profile-img04"
                                                src={attachment.imageUrl}
                                                alt="user pic"
                                              />))}
                                          </div>
                                          <div className="flex-grow-1 ms-2">
                                            <div className="row">
                                              <div className="col-lg-8">
                                                {this.state.designationList[replyStage1CommentItem.submitteremailid] && this.state.designationList[replyStage1CommentItem.submitteremailid].map((item: userDesignation) => (
                                                  <h4 className="profile-name-text02">
                                                    {item.name}
                                                  </h4>))}
                                                {this.state.designationList[replyStage1CommentItem.submitteremailid] && this.state.designationList[replyStage1CommentItem.submitteremailid].map((item: userDesignation) => (
                                                  <h5 className="grey-text03">
                                                    {item.designation}
                                                  </h5>))}
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="float-end">
                                                  <h5 className="grey-text03  float-start">
                                                    {this.formatDate(replyStage1CommentItem.enteredon)}
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
                                                        {this.loggedInUser.toLowerCase() == replyStage1CommentItem.submitteremailid.toLowerCase() && (
                                                           <>
                                                           <a className="dropdown-item"
                                                             onClick={() => this.SubmitReplyForIdeaComment(commentItem.commentid, replyStage1CommentItem.repliesid, item.ideaid, "DELETE")}>
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
                                                            /></>)}
                                                        {this.loggedInUser.toLowerCase() == replyStage1CommentItem.submitteremailid.toLowerCase() && (
                                                         
                                                            <>
                                                            <a className="dropdown-item"
                                                              onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid, replyStage1CommentItem.repliesid, replyStage1CommentItem.comments)}>
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
                                                            /></>)}
                                                        {this.loggedInUser.toLowerCase() != replyStage1CommentItem.submitteremailid.toLowerCase() && (
                                                          <a className="dropdown-item"
                                                            onClick={() => this.reportStage2CommentId(item.ideaid, commentItem.commentid, replyStage1CommentItem.repliesid, item.ideatitle, item.ideaowner, replyStage1CommentItem.comments)}>
                                                            {langText.report}
                                                          </a>)}
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
                                        {(!this.state.isReply2ShowtextBox[replyStage1CommentItem.repliesid] &&
                                          <h3 className="h-idea-heading-reply mb-0">
                                            {replyStage1CommentItem.comments}{" "}
                                          </h3>)}
                                        {(this.state.isReply2ShowtextBox[replyStage1CommentItem.repliesid] &&
                                          <TextField
                                            placeholder={langText.editcomment}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            value={this.state.editReplyComment}
                                            onChange={(e, newValue) => this.onChangeReplyEditComment(e, newValue)}
                                            onKeyPress={(e) => this.handleKeyPressReplyEditComment(e, commentItem.commentid, replyStage1CommentItem.repliesid)}
                                          />)}
                                      </div>

                                      <div className="col-lg-12 mt-3">
                                        <div className="clearfix">
                                          {/* <div className="float-start">
                                          <p className="vcs-text-dark me-3 ms-3 float-start mb-0 cursor-pointer">
                                            <img
                                              src={Voteicon}
                                              alt="edit-icon"
                                              width="20"
                                              height="20"
                                            />
                                            <span className="ms-2">{replyStage1CommentItem.uservotecount}</span>
                                          </p>
                                        </div> */}
                                          {/* <div className="float-end">
                        <p className="vcs-text-dark float-start mb-0 cursor-pointer">
                          <span className="ms-2">Reply</span>
                        </p>
                      </div> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {this.state.isReplyCommentShow[commentItem.commentid] && (
                                  <div className="col-lg-12 input-with-img">

                                    <div className="mb-3 mt-4 input-group">
                                      <span className="input-group-text" id="basic-addon1">
                                      {this.userImageUrl != '' && (
                        <img
                          className="profile-img02"
                          src={this.userImageUrl}
                          alt="user pic"
                        />)}
                      {this.userImageUrl == '' && (
                        <img
                          className="profile-img02"
                          src={DummyProfileimg}
                          alt="user pic"
                        />)}

                                      </span>
                                      <TextField
                                        placeholder={langText.addareply}
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        className="form-control"
                                        value={this.state.replyStage1Comment}
                                        onChange={(e, newValue) =>
                                          this.onChangeReplyComment(e, newValue)}
                                        onKeyPress={(e) => this.handleKeyPressReplyComment(e, commentItem.commentid, item.ideaid, item.ideatitle, item.ideaowner)}
                                      />
                                    </div>

                                  </div>)}
                                {/* {this.state.isReplyCommentShow[commentItem.commentid] && ( */}
                                {/* <div className="col-lg-12 input-with-img">
                <InputGroup className="mb-3 mt-3">
                  <InputGroup.Text id="basic-addon1">
                    <img
                      className="profile-img02"
                      src={ProfileImg02}
                      alt="user pic"
                    />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Add a reply...."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>

                 <div className="mb-3 mt-4 input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <img
                      className="profile-img02"
                      src={ProfileImg02}
                      alt="user pic"
                    />
                  </span>
                  <TextField
                    placeholder="Add a reply...."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="form-control"
                    value={this.state.replyStage1Comment}
                    onChange={(e, newValue) =>
                                      this.onChangeReplyComment(e, newValue)}
                    onKeyPress={(e) => this.handleKeyPressReplyComment(e, commentItem.commentid,item.ideaid,item.ideatitle,item.ideaowner)}
                  />
                </div>

              </div> */}

                              </div>
                              {/* )} */}
                            </div>
                          ))}
                          {/* <!-- "Load More" button --> */}
                          {this.state.isCommentLoadMore && (
                            <button className="load-more-comments-btn" onClick={() => this.loadMoreComments(item.ideaid)}>{langText.loadmore}</button>
                          )}

                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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

          <div
            className={this.state.modalClass}
            id="nodataModal"

          >
            <div className="modal-dialog modal-90w">
              <div className="modal-content">
                <div className="modal-header">
                  {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.closeModal()}
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
                      <h1 className="moheading01">{langText.nodataavailable}</h1>
                      {/* <p className="motext01">
                        You have no data in this page
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <a

                    type="button"
                    className="btn btn-danger m-btn"
                    onClick={() => this.closeModal()}
                  >
                    {langText.ok}
                  </a>
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
              className: 'ebtdialogsuccess'
            }}
          >
            <img
              src={MIe01}
              className="mins-icon ebtdialogicon"
              alt="edit-icon"
              width="48"
              height="48"
            />
            <DialogFooter>
              <DefaultButton onClick={this.closeSuccessDialog} text={langText.closed}/>
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
              <DefaultButton onClick={this.closeErrorDialog} text={langText.closed} />
            </DialogFooter>
          </Dialog>

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
              title: "Do you want to report this comment?",
              className: 'ebtdialogsuccess'
            }}
          >
            {/* <div className='row'>

          Do you want to report this comment?
                  </div> */}
            <DialogFooter>
              <DefaultButton onClick={() => this.closestage1CommentReportDialog()} text={langText.closed}/>
              <DefaultButton onClick={() => this.reportComment()} text={langText.yes} />

            </DialogFooter>
          </Dialog>

          <Dialog
            hidden={!this.state.stage2CommentReportDialog}
            onDismiss={this.closestage2CommentReportDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: "Do you want to report this comment?",
              className: 'ebtdialogsuccess'
            }}
          >
            {/* <div className='row'>

          Do you want to report this comment?
                  </div> */}
            <DialogFooter>
              <DefaultButton onClick={() => this.reportStage2Comment()} text={langText.yes} />
              <DefaultButton onClick={() => this.closestage2CommentReportDialog()} text={langText.closed} />
            </DialogFooter>
          </Dialog>

        </div>
      </div>
    );
  }
}
