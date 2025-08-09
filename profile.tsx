import * as React from 'react';

import type { IAfkProfileProps } from './IAfkProfileProps';



import "./../assets/css/afstyle.css";
import "./../assets/js/bootstrap.bundle.min.js";
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
import Globeicon from "./../assets/img/svg/globe-icon.png";
//import HomeBanner01 from "./../assets/img/hbanner01.jpg";
import Sharecopylinkicon from "./../assets/img/svg/share-copylink-icon.png";
import Sharesenddirectlinkicon from "./../assets/img/svg/share-send-directlink-icon.png";
import Commenticon from "./../assets/img/svg/comment-icon.png";
import Shareicon from "./../assets/img/svg/share-icon.png";
import CBanner04 from "./../assets/img/cu-bg04.jpg";
//import ProfileImg13 from "./../assets/img/profile-img14.jpg";
//import ProfileImg03 from "./../assets/img/profile-img03.jpg";
import Communitygoldcircle from "./../assets/img/svg/community-gold-circle.png";
import AchievementsRank from "./../assets/img/svg/achievements/achievements-rank.png";
import AchievementsSubmitted from "./../assets/img/svg/achievements/achievements-submitted-ideas.png";
import AchievementsEvaluatedIdeas from "./../assets/img/svg/achievements/achievements-evaluated-ideas.png";
import AchievementsImplementedIdeas from "./../assets/img/svg/achievements/achievements-implemented-ideas.png";
import AchievementsInnovationPoints from "./../assets/img/svg/achievements/achievements-innovation-points.png";
import AchievementsRewards from "./../assets/img/svg/achievements/achievements-rewards.png";
import EditiconFill from "./../assets/img/svg/edit-icon-fill.png";
import DummyProfileimg from "./../assets/img/profile-img13.jpg";

import { Checkbox } from "@fluentui/react";

import deletecomment from "./../assets/img/svg/comment-delete.png";
import editcomment from "./../assets/img/svg/comment-edit.png";

//import { SearchBox } from "@fluentui/react/lib/SearchBox";

import { TextField } from "@fluentui/react/lib/TextField";
import * as CryptoJS from 'crypto-js';
// import {
//   //Dropdown,
//   DropdownMenuItemType,
//   IDropdownOption,
//   // IDropdownProps,
// } from "@fluentui/react/lib/Dropdown";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import { IAfkProfileStates } from './IAfkProfileStates';
import { IdeationAPIServices } from '../../../ideationAPIservice/ideationAPI';
//import NoDataicon from "./../assets/img/no_data.png";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
} from "@fluentui/react";
import MIe02 from "./../assets/img/svg/modal/cancel-clipboard.png";
import { Web } from 'sp-pnp-js';
import ReactTooltip from "react-tooltip";
import Downloadicon from "./../assets/img/svg/download-icon.png";
import ReactPlayer from 'react-player';
import hbanner10 from "./../assets/img/hbanner10.png";
import Commentreplyicon from "./../assets/img/svg/comment-reply-icon.png";
import Replyellipsesicon from "./../assets/img/svg/ellipses-reply.png";
// import en from "./../assets/lang/en.json";
// import ar from './../assets/lang/ar.json';
// const options: IDropdownOption[] = [
//   {
//     key: "fruitsHeader",
//     text: "Fruits",
//     itemType: DropdownMenuItemType.Header,
//   },
//   { key: "apple", text: "Apple" },
//   { key: "banana", text: "Banana" },
//   { key: "orange", text: "Orange", disabled: true },
//   { key: "grape", text: "Grape" },
//   { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
//   {
//     key: "vegetablesHeader",
//     text: "Vegetables",
//     itemType: DropdownMenuItemType.Header,
//   },
//   { key: "broccoli", text: "Broccoli" },
//   { key: "carrot", text: "Carrot" },
//   { key: "lettuce", text: "Lettuce" },
// ];
// interface Attachment {
//   imageUrl: string;
//   EmailIDID: number;
// }
const stackTokens: IStackTokens = { childrenGap: 20 };
//const dropdownStyles = { dropdown: { width: 300 } };
// const stackTokens = { childrenGap: 10 };
// interface Attachment {
//   imageUrl: string;
//   IdeaID: number;
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
export default class AfkProfile extends React.Component<IAfkProfileProps, IAfkProfileStates, {}> {
  private imageUrl: any = "";
  public userInfo: any;
  private IdeationServices: IdeationAPIServices;
  private skillArray: any
  private imageId: any;
  mockSkill: any;
  loggedInUser: any;
  userImageUrl: any = '';
  sK0y: any;
  isHMAC: any;
  token: any;
  profileDetails: any;
  globalClass = "global-en";
  langCode: any = 1033;
  constructor(props: IAfkProfileProps, state: IAfkProfileProps) {
    super(props);
    this.IdeationServices = new IdeationAPIServices();
    this.sK0y = "";
    this.isHMAC = "";
    this.token = "";
    this.imageUrl = "";
    try {
      let web: any = new Web(
        "https://dewa.sharepoint.com.mcas.ms/sites/qaideation/"
      );
      web.currentUser
        .get()
        .then(async (user: any) => {
          if (user) {
            this.userInfo = user;
            //let userName = user.Title;
            let emailID = user.Email;
            let apiResponse: any;
            let responseData: any = [];
            let strnamearr = emailID.split('@');
            let strname = strnamearr[0];
            let strUpperName = strname.toUpperCase();
            let ntid = '';
            if (emailID.includes('@dewa.gov.ae')) {
              ntid = strUpperName;
            }
            else {
              ntid = emailID;
            }
            console.log(ntid);
            console.log("userId", strUpperName)
            let params = {
              "ntid": ntid
              //"ntid": ntid
            }
            const sK0y = this.sK0y;
            const jString = JSON.stringify(params);
            const hmacValue = this.generateHMAC(jString, sK0y);
            let headers: any;
            if (this.isHMAC == "Enable") {
              headers = {
                'headers': {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'hmac-base64': hmacValue,
                  'Authorization': `Bearer ${this.token}`
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
            apiResponse = await this.IdeationServices.getData(params, headers, "getSkillDetails");
            responseData = apiResponse.data;

            let dataList: any = [];
            dataList = responseData.data;
            console.log(dataList);
            let prnumber = dataList[0].prno;
            console.log(prnumber)
            // var struser =
            //'{"prno":"' + prnumber + '","userName":"' + userName + '","userEmailID":"' + emailID + '"}';
            this.setState({ loginUserName: user.Title, loginUserEmailID: emailID });

            // var struser =
            //   '{"userEmailID":"' + emailID + '","userName":"' + userName + '"}';
            // localStorage.removeItem("userinfo");
            // localStorage.setItem("userinfo", struser);
          }

          console.log("user info", user);
        })
        .catch((error: any) => {
          console.error("Error fetching user information", error);
        });
    } catch (e) {
      console.error("Catch user information", e);
    }
    this.skillArray = [];
    this.state = {
      modalHideClass: false,
      loginUserName: "",
      loginUserEmailID: "",
      isSuccess: false,
      isLoader: false,
      isSuccessDialogVisible: false,
      successMessageDesciption: '',
      successMessageTitle: '',
      errorDesciption: '',
      errorTitle: '',
      isDialogVisible: false,
      allIdeaList: [],
      userProfile: {},
      draftList: [],
      voteList: [],
      userName: '',
      userEmailId: '',
      rewardedcount: 0,
      followingcount: 0,
      followercount: 0,
      submittedcount: 0,
      evaluatedcount: 0,
      implementedcount: 0,
      totalscore: 0,
      filterName: '',
      filterWithCase: '',
      imageList: [],
      allDraftIdeaList: [],
      rank: 0,
      commentIdeaList: [],
      voteIdeaList: [],
      about: '',
      skill: [],
      editSkill: [],
      attachment: [],
      profileId: 0,
      profileimage: {},
      sK0y: "",
      isHMAC: "",
      token: "",
      bookMarkClass: 'modal fade',
      bookMarkDesc: 'Added to your Bookmarks',
      isBookmarkModalOpen: false,
      profileAttachments: {},
      uniqueIds: [],
      attachments: {},
      dropdownClass: 'dropdown-menu',
      designationList: {},
      allReplyCommentList: [],
      commentList: [],
      isCommentShow: {},
      isCommentLoadMore: false,
      allCommentList: [],
      comment: "",
      isReplyShowtextBox: false,
      isReply2ShowtextBox: false,
      ReplyCommenteditID: 0,
      editReplyComment: '',
      ideaReply2CommentId: 0,
      CommentReplyId: 0,
      automateTitle: '',
      automateOwner: '',
      automateComment: '',
      editID: 0,
      ideaID: "",
      editComment: "",
      replyStage1CommentList: [],
      isReplyCommentShow: false,
      stage2CommentReportDialog: false,
      reportCommentId: 0,
      reportRepliesId: 0,
      reportIdeaId: 0,
      stage1CommentReportDialog: false,
      replyStage1Comment: '',
      skillText: "",
      modalClass: "modal fade",
      lang: "en",
      class: "afkprofile-en",
      errorMessage: "",
      Youcanuploadfivefileonly: "",
      Youcanuploadonefileonly: "",
      fileextension: "",
      filesbelow5MB: "",
      recent: "",
      implemented: "",
      latestsubmissions: "",
      oldsubmissions: "",
      mostliked: "",
      mostcomments: "",
      englishContent: "",
      arabicContent: "",
      name: "",
      userdesignation: ""
    }
  }
  public async componentDidMount() {

    await this.getHMACENABLEorDISABLE();
    await this.getToken();

    this.fetchJsonFile('ar.json');
    this.fetchJsonFile('en.json');
    this.changeLanguage();
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    this.loggedInUser = user.userEmailID;
    this.setState({ userName: user.userName, userEmailId: user.userEmailID });


    //this.getmyideasDrafts();
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
    let parsedlang = JSON.parse(lang);
    if (parsedlang.lang == "ar") {
      this.setState({
        class: "afkprofile-ar", lang: "ar", errorMessage: 'رسالة خطأ', Youcanuploadonefileonly: 'يمكنك تحميل ملف واحد فقط', Youcanuploadfivefileonly: 'يمكنك تحميل خمسة ملفات كحد أقصى فقط', fileextension: 'غير قادر على تحميل ملفك. يرجى التحقق من امتداد الملف', filesbelow5MB: 'الرجاء رفع الملف بسعة أقل من ٥ ميغابايت',
        recent: 'حديث', implemented: 'تنفيذ', latestsubmissions: 'آخر تقديم', oldsubmissions: 'التقديمات القديمة', mostliked: 'الأكثر إعجابا', mostcomments: 'معظم التعليقات'
      });
      this.globalClass = "global-ar"
      body.classList.add('global-ar');
      this.langCode = 14337;
      this.getSkillDetails();
      this.getUserProfileDetails();
      this.getmyideas();
      this.myDraftideas();
      this.getmyideasComment();
      this.getmyideasVotes();
      this.getAttachment();
    }
    else {
      this.setState({
        class: "afkprofile-en", lang: "en", errorMessage: 'Error Message', Youcanuploadonefileonly: 'You can upload one file only', Youcanuploadfivefileonly: 'You can upload maximum five files only', fileextension: 'Unable to upload your file. Please check file extension', filesbelow5MB: 'You can upload only the files below 5MB',
        recent: 'Recent', implemented: 'Implemented', latestsubmissions: 'Latest Submissions', oldsubmissions: 'Old Submissions', mostliked: 'Most Liked', mostcomments: 'Most Comments'
      });
      this.globalClass = "global-en"
      body.classList.add('global-en');
      this.langCode = 1033;
      this.getSkillDetails();
      this.getUserProfileDetails();
      this.getmyideas();
      this.myDraftideas();
      this.getmyideasComment();
      this.getmyideasVotes();
      this.getAttachment();
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
  public getUserProfileDetails = async () => {
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getUserProfileDetails", user.userName)
    let params = {
      userid: user.prno,
      followerUserId: user.userEmailID

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

    apiResponse = await this.IdeationServices.getData(params, headers, "getUserProfileDetails");
    responseData = apiResponse.data;

    let response: any;
    response = responseData.data;
    console.log(response)

    //if (dataList.length > 0) {
    // this.mockSkill = response[0].skills.replace(/""/g, 'null');
    // if (this.mockSkill == '') {
    //   this.mockSkill = null;
    // }
    // else {
    //   this.mockSkill = this.mockSkill.split(',')
    // }
    // this.skillArray = response[0].skills.split(',');
    // let filteredArray = this.skillArray.filter((element: any) => element !== "" && element !== null && element !== undefined);
    // this.skillArray = filteredArray;
    this.setState({
      //isLoader: false,
      userProfile: response,
      profileId: response[0].profileid,
      rewardedcount: response[0].rewardedcount,
      followingcount: response[0].followingcount,
      followercount: response[0].followercount,
      submittedcount: response[0].submittedcount,
      evaluatedcount: response[0].evaluatedcount,
      implementedcount: response[0].implementedcount,
      totalscore: response[0].totalscore,
      rank: response[0].profilerank,
      about: response[0].about,
      // skill: response[0].skills //(response[0].skills.split(','))

    })
    //this.skillArray = response[0].skills.split(',');
    console.log("State allIdeaList", this.state.skill);
    //}

  }

  // public getSkillDetails = async () => {
  //   debugger;
  //   let apiResponse: any;
  //   let responseData: any = [];
  //   let struser: any = localStorage.getItem('userinfo');
  //   let user = JSON.parse(struser);
  //   let userName = user.userName;
  //   let emailID = user.userEmailID
  //   let strnamearr = emailID.split('@');
  //   let strname = strnamearr[0];
  //   let strUpperName = strname.toUpperCase();
  //   let ntid = '';
  //   if (emailID.includes('@dewa.gov.ae')) {
  //     ntid = strUpperName;
  //   }
  //   else {
  //     ntid = emailID;
  //   }
  //   console.log(ntid);
  //   console.log("userId", strUpperName)
  //   let params = {
  //     "ntid": "NISHANTH.VEERASAMY"
  //     //"ntid": ntid
  //   }
  //   const sK0y = this.sK0y;
  //   const jString = JSON.stringify(params);
  //   const hmacValue = this.generateHMAC(jString, sK0y);
  //   let headers: any;
  //   if (this.isHMAC == "Enable") {
  //     headers = {
  //       'headers': {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'hmac-base64': hmacValue,
  //         'Authorization': `Bearer ${this.token}`
  //       }
  //     };

  //   }
  //   else {
  //     headers = {
  //       'headers': {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       }
  //     };
  //   }
  //   apiResponse = await this.IdeationServices.getData(params, headers, "getSkillDetails");
  //   console.log(apiResponse); // Log the full API response
  //   responseData = apiResponse.data;

  //   if (responseData.data.length > 0) {

  //     let dataList: any = [];
  //     dataList = responseData.data;
  //     console.log(dataList);
  //     this.setState({

  //       // skill: responseData.data[0].skills,
  //       skill: dataList[0].skills,

  //     });
  //     let prnumber = dataList[0].prno;
  //     // let name = dataList[0].
  //     let localstruser =
  //       '{"userEmailID":"' + emailID + '","userName":"' + userName + '","prno":"' + prnumber + '"}';
  //     localStorage.removeItem("userinfo");
  //     localStorage.setItem("userinfo", localstruser);
  //   } else {

  //   }
  //   this.getEmployeeDetails("");
  // }

  public getSkillDetails = async () => {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let emailID = user.userEmailID;
      //  let userName = user.userName;
      let ntid = emailID.includes('@dewa.gov.ae') ? emailID.split('@')[0].toUpperCase() : emailID;

      let params = { "ntid": ntid };
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
      apiResponse = await this.IdeationServices.getData(params, headers, "getSkillDetails");
      console.log("Full API response: ", apiResponse);
      responseData = apiResponse?.data;

      if (responseData?.data?.length > 0) {
        let dataList: any = responseData.data;
        console.log("Data list: ", dataList);
        this.profileDetails = dataList[0];
        this.getEmployeeDetailsofUser(dataList[0].prnumber);
        this.setState({ skillText: dataList[0]?.skills });
        this.setState({
          skill: dataList[0]?.skills?.split(',') || [], // Ensure skill is set properly
          // editSkill: [],
        });

        // let prnumber = dataList[0]?.prno || 'default_pr_number';
        // let localstruser = `{"userEmailID":"${emailID}","userName":"${userName}","prno":"${prnumber}"}`;
        // localStorage.setItem("userinfo", localstruser);
      } else {
        console.warn("No skill data found.");
        this.setState({
          skill: [], // Set an empty array if no data
        });
      }

      // this.getEmployeeDetails(""); // Check if this function is working properly
    } catch (error) {
      console.error("Error fetching skill details: ", error);
    }
  };

  public UpdateSkillDetails = async () => {
    // this.setState({ skill: this.state.editSkill });
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    //  let struser: any = localStorage.getItem('userinfo');
    //  let user = JSON.parse(struser);
    //  let emailID = user.userEmailID;
    //  let userName = user.userName;
    //  let ntid = emailID.includes('@dewa.gov.ae') ? emailID.split('@')[0].toUpperCase() : emailID;
    let params = {
      NTID: this.profileDetails.ntid,
      FirstName: this.profileDetails.firstName,
      LastName: this.profileDetails.lastName,
      EMAIL: this.profileDetails.email,
      DIVISION: this.profileDetails.division,
      DEPARTMENT: this.profileDetails.department,
      SKILLS: this.state.skillText
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

    apiResponse = await this.IdeationServices.postData(params, headers, "UpdateSkillDetails");
    responseData = apiResponse.data;
    //if (responseData.data.respcode > 0) {
    console.log("submitProfile", responseData.data);
    this.getSkillDetails();


    // }

  }


  public getmyideas = async (startnum = 0, action = "", actionWithCase = "") => {
    debugger;
    this.setState({ isLoader: true, allIdeaList: [] });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getmyideas", user.userName)
    let params =
    {
      "ideaOwner": user.prno,
      "ideaid": 0,
      "action": "IDEAOWNER",
      "languagecode": "1033"
    }
    // let params = {
    //   ideaOwner: user.prno,
    //   ideaid: 1148,
    //   action: "GETIDEABYID",
    //   languagecode:"1033"
    //   // ideaid: 0,
    //   // action:"ALL"
    // }
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

    apiResponse = await this.IdeationServices.getData(params, headers, "myideas");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("allIdeaList", dataList);
      this.setState({
        isLoader: false,
        allIdeaList: dataList,
        filterName: action == "" ? "Recent" : action,
        filterWithCase: actionWithCase == "" ? "Recent" : actionWithCase
      }, () => {
        let uniqueIds = dataList.reduce((acc: any, current: any) => {
          if (!acc.includes(current.submitteremailid)) {
            acc.push(current.submitteremailid);
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

  }

  fetchDesignationForAllIdeas = async () => {
    for (const idea of this.state.allIdeaList) {
      console.log(idea);
      await this.getEmployeeDetails(idea.ideaowner);
      //await this.getEmployeeDetails(99008746);
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

  public async getEmployeeDetailsofUser(prno: any) {
    try {
      let apiResponse: any;
      let responseData: any = [];
      let struser: any = localStorage.getItem('userinfo');
      let user = JSON.parse(struser);
      let params =
      {
        employeenumber: user.prno,
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
        //List.push({ Ideaowner: prno, designation: designation, name: nameEn, arname: namear })
        this.setState({ name: nameEn, userdesignation: designation })
      }
      if (this.state.lang == 'ar') {
        this.setState({ name: namear, userdesignation: responseData.jobtitleinArabic })
        //  List.push({ Ideaowner: prno, designation:  responseData.jobtitleinArabic, name: namear, arname: namear })
      }
      console.log(List)
      //this.setState({ designationList: List });
      // this.setState((prevState => ({
      //   designationList: {
      //     ...prevState.designationList,
      //     [prno]: List
      //   }
      // })));
      // console.log(this.state.designationList);
      // this.setState({ imageList: [] });
    }
    catch (ex) {
      console.log(ex);
    }
  }
  fetchAttachmentsForAllIdeasForVote = async () => {
    for (const idea of this.state.voteIdeaList) {
      await this.fetchAttachmentsForIdea(idea.ideaid);
    }
  };

  fetchAttachmentsForAllIdeas = async () => {
    for (const idea of this.state.allIdeaList) {
      await this.fetchAttachmentsForIdea(idea.ideaid);
    }
  };

  fetchAttachmentsForIdea = async (ideaId: any) => {
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
  public getmyideasDrafts = async () => {
    debugger;
    this.setState({ isLoader: true, allIdeaList: [] });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getmyideas", user.userName)
    let params = {
      ideaOwner: user.prno,
      ideaid: 0,
      action: "DRAFTS",
      "languagecode": "1033"
      // startnum: startnum,
      // limit: this.state.limit
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

    apiResponse = await this.IdeationServices.getData(params, headers, "myideas");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("draftList", dataList);
      let newArray = dataList.filter((dataList: any) => dataList.ideaowner == user.user.prno);
      console.log(newArray);
      this.setState({
        //isLoader: false,
        draftList: dataList,
      })
      console.log("State allIdeaList", this.state.draftList);
    }

  }

  public getmyideasVotes = async () => {
    debugger;
    this.setState({ isLoader: true, voteIdeaList: [] });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("VOTEideas", user.userName)
    let params = {
      ideaid: 0,
      userid: user.prno
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

    apiResponse = await this.IdeationServices.getData(params, headers, "getIdeaVotes");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("voteList", dataList);
      let sortedList: any = [];
      sortedList = this.sortDescending(dataList);
      console.log(sortedList);
      this.setState({
        //isLoader: false,
        voteIdeaList: sortedList,
      }, () => {
        let uniqueIds = sortedList.reduce((acc: any, current: any) => {
          if (!acc.includes(current.submitteremailid)) {
            acc.push(current.submitteremailid);
          }
          return acc;
        }, []);
        this.setState({ uniqueIds: uniqueIds });
        this.fetchAttachmentsForAllIdeasForVote();
        this.fetchAttachmentsForAllProfile(uniqueIds);
        this.fetchDesignationForAllVotedIdeas();
      });
      console.log("State voteList", this.state.voteList);
    }

  }

  fetchDesignationForAllVotedIdeas = async () => {
    for (const idea of this.state.voteIdeaList) {
      console.log(idea);
      await this.getEmployeeDetails(idea.ideaowner);
      //await this.getEmployeeDetails(99008746);
    }
  };

  sortDescending = (arr: any): any => {
    return arr.sort((a: any, b: any) => new Date(b.enteredon).getTime() - new Date(a.enteredon).getTime());
  };


  public getmyideasComment = async () => {
    debugger;
    this.setState({ isLoader: true, commentIdeaList: [] });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("commentIdeaListideas", user.userName)
    let params = {
      userid: user.prno,
      IDEAID: 0
      // userid: user.userName,
      // action: "USERCOMMENTS"

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

    apiResponse = await this.IdeationServices.getData(params, headers, "getIdeaComments");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("voteList", dataList);
      this.setState({
        //isLoader: false,
        commentIdeaList: dataList,
      }
        , () => {
          let uniqueIds = dataList.reduce((acc: any, current: any) => {
            if (!acc.includes(current.submitteremailid)) {
              acc.push(current.submitteremailid);
            }
            return acc;
          }, []);
          this.setState({ uniqueIds: uniqueIds });
          this.fetchAttachmentsForAllIdeasForComment();
          this.fetchAttachmentsForAllProfile(uniqueIds);
          this.fetchDesignationForAllCommentedIdeas();
        });
    }

  }

  fetchDesignationForAllCommentedIdeas = async () => {
    for (const idea of this.state.commentIdeaList) {
      console.log(idea);
      await this.getEmployeeDetails(idea.ideaowner);
      //await this.getEmployeeDetails(99008746);
    }
  };

  fetchAttachmentsForAllIdeasForComment = async () => {
    for (const idea of this.state.commentIdeaList) {
      await this.fetchAttachmentsForIdea(idea.ideaid);
    }
  };

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
  public myDraftideas = async () => {
    debugger;
    this.setState({ isLoader: true, allDraftIdeaList: [] });
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    console.log("getMyideas", user.userName)
    let params = {
      ideaOwner: user.prno,
      "ideaid": 0,
      "action": "DRAFT",
      "languagecode": "1033"
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

    apiResponse = await this.IdeationServices.getData(params, headers, "myideas");
    responseData = apiResponse.data;

    let dataList: any = [];
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("allDraftIdeaList", dataList);
      // let newArray: any = [];
      // let slicedArr: any;
      // newArray = dataList.filter((dataList: any) => dataList.ideaowner == user.userName);
      // slicedArr = newArray.slice(0, 2);
      this.setState({
        isLoader: false,
        allDraftIdeaList: dataList //slicedArr
        // filterName: action == "" ? "Recent" : action
      })
      console.log("State allDraftIdeaList", this.state.allDraftIdeaList);

    }

  }

  public onChangeabout(e: any, selctedOptions: any) {
    debugger
    if (selctedOptions.length <= 250) {
      this.setState({ about: selctedOptions })
    }
  }

  public onChangeSkillText(e: any, selctedOptions: any) {
    debugger
    //if (selctedOptions.length <= 250) {
    this.setState({ skillText: selctedOptions })
    //}
  }

  public onChangeSkill(e: any, selctedOptions: any, skill: any) {
    console.log(selctedOptions)
    debugger;
    if (selctedOptions) {
      if (!this.skillArray.includes(skill)) {
        this.skillArray.push(skill)
      }
      else {
        this.skillArray.pop(skill);
      }
      //this.mockSkill = this.skillArray.replace(/""/g, 'null');
      // if(this.mockSkill == ''){
      //   this.mockSkill = null;
      // }
      // else{
      //   this.mockSkill = this.mockSkill.split(',')
      // }
      //let skillArrays = this.skillArray.split(',');
      let filteredArray = this.skillArray.filter((element: any) => element !== "" && element !== null && element !== undefined);
      this.skillArray = filteredArray;
      this.setState({ editSkill: this.skillArray })
      console.log(this.state.editSkill);
    }
  }



  onSave() {

    this.submitProfile();
  }

  public submitProfile = async () => {
    // this.setState({ skill: this.state.editSkill });
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let params = {
      "USERID": user.prno,
      "useremailid": user.prno,
      "PROFILEID": this.state.profileId,
      //"RANK": "1",
      "SKILLS": this.state.skillText,
      "ABOUT": this.state.about,
      "profilepiccount": 1,
      "ACTION": this.state.profileId == 0 ? "ADD" : "UPDATE"//"ADD"
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

    apiResponse = await this.IdeationServices.postData(params, headers, "submitProfileDetails");
    responseData = apiResponse.data;
    //if (responseData.data.respcode > 0) {
    console.log("submitProfile", responseData.data);


    // }

  }
  public handleChangeAttachment = (file: any) => {
    debugger;
    if (this.state.attachment.length == 0) {
      let fi = file.target.files;
      let fileList = [];
      if (fi.length > 0) {
        if (fi.length > 1) {
          this.setState({
            errorTitle: this.state.errorMessage,
            errorDesciption: this.state.Youcanuploadonefileonly,
          });
          this.openErrorDialog();
          return false;
        }
        for (var i = 0; i < fi.length; i++) {
          let fileToUpload = fi[i];
          let fileSize = fi[i].size;
          var fileSize_KB = Math.round(fileSize / 1024);
          var fileSize_MB = Math.round(fileSize_KB / 1024);
          var fileName = fi[i].name.toLowerCase();
          var contentType = fi[i].type;
          if (fileSize_MB <= 5) {
            let allowFile = false;
            allowFile = this.checkFileValuranabity(
              fileName,
              fileSize,
              contentType
            );
            if (allowFile) {
              fileList.push({ fileName: fileName, fileContent: fileToUpload });
            } else {
              this.setState({
                errorTitle: this.state.errorMessage,
                errorDesciption:
                  this.state.fileextension,
              });
              this.openErrorDialog();
              return false;
            }
          } else {
            this.setState({
              errorTitle: this.state.errorMessage,
              errorDesciption: this.state.filesbelow5MB,
            });
            this.openErrorDialog();
            return false;
          }
        }
        this.setState({ attachment: fileList });
        this.createAttachmentFilesListItems();
      }
    } else if (this.state.attachment.length < 5) {
      let fi = file.target.files;
      let fileList = [];
      if (fi.length > 0) {
        if (fi.length > 1) {
          this.setState({
            errorTitle: this.state.errorMessage,
            errorDesciption: this.state.Youcanuploadfivefileonly,
          });
          this.openErrorDialog();
          return false;
        }
        for (var i = 0; i < fi.length; i++) {
          let fileToUpload = fi[i];
          let fileSize = fi[i].size;
          var fileSize_KB = Math.round(fileSize / 1024);
          var fileSize_MB = Math.round(fileSize_KB / 1024);
          var fileName = fi[i].name.toLowerCase();
          var contentType = fi[i].type;
          if (fileSize_MB <= 5) {
            let allowFile = false;
            allowFile = this.checkFileValuranabity(
              fileName,
              fileSize,
              contentType
            );
            if (allowFile) {
              fileList = this.state.attachment;
              fileList.push({ fileName: fileName, fileContent: fileToUpload });
            } else {
              this.setState({
                errorTitle: this.state.errorMessage,
                errorDesciption:
                  this.state.fileextension,
              });
              this.openErrorDialog();
              return false;
            }
          } else {
            this.setState({
              errorTitle: this.state.errorMessage,
              errorDesciption: this.state.filesbelow5MB,
            });
            this.openErrorDialog();
            return false;
          }
        }
        this.setState({ attachment: fileList });
        this.createAttachmentFilesListItems();
      }
    }
  };
  closeModal() {
    this.setState({ modalHideClass: false });

  }
  public createAttachmentFilesListItems() {
    //debugger;
    let rows = [];
    if (this.state.attachment.length > 0) {
      console.log("files", this.state.attachment);
      for (var i = 0; i < this.state.attachment.length; i++) {
        let fileName = this.state.attachment[i].fileName;
        rows.push(
          <div className="col-lg-6 mb-4">
            <div className="fu-attachement">
              <p className="fu-filename">
                {this.state.attachment[i].fileName}
              </p>
              <span>
                <i
                  className="fa fa-trash"
                  onClick={() => this.removeItem(fileName)}
                ></i>
              </span>
            </div>
          </div>
        );
      }
    } else {
      rows = [];
    }
    return rows;
  }
  cleaAttachment = () => {
    this.setState({ attachment: [], modalHideClass: true });
  };
  removeItem = (fileName: any) => {
    // Using the functional form of setState to ensure you're working with the latest state
    let removedFileList = this.state.attachment.filter(
      (a: any) => a.fileName != fileName
    );
    this.setState({ attachment: removedFileList });
  };

  private openErrorDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  private closeErrorDialog = () => {
    this.setState({ isDialogVisible: false });

  };

  public checkFileValuranabity(
    fileName: string,
    filesize: any,
    contentType: any
  ) {
    let allowFile = false;
    if (
      !(fileName.indexOf(".exe") !== -1) ||
      !(fileName.indexOf("exe") !== -1)
    ) {
      allowFile = true;
      if (this.allowedFileExtension(fileName, contentType)) {
        allowFile = true;
      } else {
        allowFile = false;
      }
    } else {
      allowFile = false;
    }
    return allowFile;
  }

  public allowedFileExtension(fileName: string, contentType: any) {
    // var strTitle =
    //   fileName.indexOf(".") > 0
    //     ? fileName.split(".")[1].toLowerCase()
    //     : "unknown";
    let returnValue = false;
    if (
      contentType == "image/jpeg" ||
      contentType == "image/png" ||
      contentType == "image/jpg"
    ) {
      returnValue = true;
    }
    // else if (strTitle == "xlsx" ) {
    //   returnValue = true;
    // }
    // else if (strTitle == "doc" && contentType == "application/msword") {
    //   returnValue = true;
    // } else if (
    //   strTitle == "docx" &&
    //   contentType ==
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // ) {
    //   returnValue = true;
    // } else if (strTitle == "pdf" && contentType == "application/pdf") {
    //   returnValue = true;
    // }

    return returnValue;
  }
  onImageSubmit() {
    if (this.state.attachment.length > 0) {
      for (var i = 0; i < this.state.attachment.length; i++) {
        this.uploadfile(
          100,
          this.state.attachment[i].fileName,
          this.state.attachment[i].fileContent
        );
      }
    }
  }

  public uploadfile = async (id: any, fileName: any, files: any) => {
    debugger;
    let struser: any = localStorage.getItem('userinfo');
    let user = JSON.parse(struser);
    let fname = fileName;
    let file = files;
    //let web:any;
    const web: any = new Web("https://dewa.sharepoint.com/sites/qaideation/");
    if (this.imageUrl == '') {

      const listitem: any = await web.lists
        .getByTitle("ProfilePicture")
        .items.add({ Title: fname, EmailID: user.prno, ProfileID: this.state.profileId })
        .then((li: any) => {
          li.item.attachmentFiles.add(fname, file);
          console.log("Attachment Successfully Inserted");
        });
      console.log(listitem);
    }
    else {

      const list = web.lists.getByTitle("ProfilePicture");

      // Update item in SharePoint list
      const listItemData = {
        Title: fname,
        EmailID: user.prno,
        ProfileID: this.state.profileId
      }

      list.items.getById(this.imageId).update(listItemData)
        //.filter(`${'EmailID'} eq '${user.userEmailID}'`).update(listItemData)
        .then(() => {
          console.log("Item successfully updated with ID:", user.prno);
          this.getAttachment();
          // Optionally, add or update attachment to the item
          if (file) {
            list.items.getById(this.imageId).attachmentFiles.add(fname, file)
              // .filter(`${'EmailID'} eq '${user.userEmailID}'`).attachmentFiles.add(fname, file)
              .then(() => {
                console.log("Attachment successfully added/updated to item with ID:", user.userEmailID);
              })
              .catch((error: any) => {
                console.error("Error adding/updating attachment:", error);
              });
          }
        })
        .catch((error: any) => {
          console.error("Error updating item:", error);
        });
    }

  };

  public async getAttachment() {
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
    if (listItems.length > 0) {
      attachmentFiles = listItems;
      let attachmentPath = "Lists/" + "ProfilePicture/" + "Attachments/";
      this.imageUrl = "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[0].Id + '/' + attachmentFiles[0].Title;
      //this.setState({profileimage : "https://dewa.sharepoint.com/sites/qaideation/" + attachmentPath + attachmentFiles[0].Id + '/' + attachmentFiles[0].Title});
      this.imageId = attachmentFiles[0].Id;
      // this.setState((prevState => ({
      // profileimage: {
      //   ...prevState.profileimage,
      //   [this.imageId]: this.imageUrl
      // }})));
      this.setState({ profileimage: this.imageUrl });
      console.log(this.state.profileimage)
    }
    else {
      this.setState({ profileimage: '' });
    }
    this.createAttachmentFilesListItems();
    console.log(this.imageUrl);
  }
  public submitVote = async (ideaId: any, isLike: any, isDisLike: string, ideaOwner: any, ideaTitle: any, isbookmarked: any, isShare: any) => {
    debugger;
    let apiResponse: any;
    let responseData: any = [];
    let struser: any = localStorage.getItem('userinfo');
    console.log("json", struser);
    let user = JSON.parse(struser);
    console.log("parsed", user);
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
      this.insertNotification("Voted for your idea - " + ideaTitle, "Vote", ideaId, ideaOwner, "BookMark");
      console.log("SubmitVote Res", responseData.data);
      //this.getmyideas();
      let dataList = this.state.allIdeaList.filter((a: any) => a.ideaid == ideaId);
      let voteCount = isLike == 1 ? dataList[0].votecnt + 1 : dataList[0].votecnt - 1;
      this.setState((prevState) => ({
        allIdeaList: prevState.allIdeaList.map((item: any) =>
          item.ideaid === ideaId
            ? {
              ...item,
              uservote: isLike,
              userbookmark: isbookmarked,
              votecnt: voteCount

            } // Add translatedText for the matched item
            : item // Keep the other items unchanged
        )
      }));
    }

  }
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
      //this.getmyideas();

    }

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

  openDropdown() {
    this.setState({ dropdownClass: 'dropdown-menu show' })
  }

  handleCopy(id: any, isLike: string, isDisLike: any, ideaOwner: any, ideaTitle: any, isbookmarked: any, isShare: any) {
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

  handleDownload(url: any) {
    console.log(url);
    window.open(url, '_blank');
  }

  redirectInnerPage(id: any) {
    console.log(id)
    window.location.replace("https://dewa.sharepoint.com.mcas.ms/sites/qaideation/SitePages/IdeaInnerPage.aspx?ideaID=" + id);
  }

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
    debugger;
    if (e.key === 'Enter') {
      if (this.state.comment == "") {
        return false;
      }
      this.submitComment(ideaID, 0, 'ADD', ideaOwner, ideaTitle);
      //this.submitComment(ideaID);
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
      // this.getAllIdeas(0, this.state.filterName)

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

  public getIdeaReplyComment = async (commentId: any) => {
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
    dataList = responseData.data;
    if (dataList.length > 0) {
      console.log("commentList", dataList);
      // Slice the first 2 comments initially
      //if(callFrom !='callFromSubmitReply'){
      const initialComments = dataList.slice(0, 2);

      this.setState(prevState => ({
        commentList: initialComments,
        allReplyCommentList: dataList,

      }));
      // }
      // else{
      //   this.setState({commentList:dataList})
      // }

    }

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

  public toggleCommentShow = (ideaId: any) => {
    this.setState(prevState => ({
      isCommentShow: {
        ...prevState.isCommentShow,
        [ideaId]: !prevState.isCommentShow[ideaId]
      }
    }));
    this.getIdeaComment(ideaId);

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

  public toggleReplyShowtextBox = (editComment: any, ideaCommentId: any) => {
    debugger;
    this.setState(prevState => ({
      isReplyShowtextBox: {
        ...prevState.isReplyShowtextBox,
        [ideaCommentId]: !prevState.isReplyShowtextBox[ideaCommentId]
      },
      editComment: editComment
    }));
  };

  reportCommentId(ideaId: any, commentId: any, ideaTitle: any, owner: any, comments: any) {
    this.setState({
      reportIdeaId: ideaId, reportCommentId: commentId,
      stage1CommentReportDialog: true, automateTitle: ideaTitle, automateOwner: owner,
      automateComment: comments
    })
  }

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
  public onChangeReplyComment(e: any, selctedOptions: any) {
    debugger;
    this.setState({
      replyStage1Comment: selctedOptions
    });
  }
  public handleKeyPressReplyComment = (e: any, commentID: any, ideaItemId: any) => {
    debugger;
    if (e.key === 'Enter') {
      if (this.state.replyStage1Comment == "") {
        return false;
      }
      this.setState({ ideaReply2CommentId: 0, CommentReplyId: 0 })
      this.SubmitReplyForIdeaComment(commentID, 0, ideaItemId, 'ADD');
    }
  }


  reportComment = () => {
    this.setState({ editID: 0 })
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
    //SubmitReplyForIdeaComment = async (ideaCommentId: any, replyCommentID: any = 0,ideaId:any, action: any = "ADD", ideaOwner: any = "", ideaTitle: any = "")
    this.SubmitReplyForIdeaComment(this.state.reportCommentId, this.state.reportRepliesId, this.state.reportIdeaId, "replyhide");
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
    debugger;
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
      //this.setState({ replyStage1CommentList: dataList })
      this.setState(prevState => ({
        replyStage1CommentList: {
          ...prevState.replyStage1CommentList,
          [commentId]: dataList
        }
      }));

    }
    this.getIdeaComment(ideaItemId);
  }

  public render(): React.ReactElement<IAfkProfileProps> {
    // const langText = this.state.lang === "en" ? en : ar;
    const langText = this.state.lang === "en" ? this.state.englishContent : this.state.arabicContent;

    // const { skill } = this.state;

    return (
      <div className="col-lg-12 profile-page">
        <div className={this.state.class}>
          <div className="row m-0 ">
            <div className="col-lg-12 p-0">
              <div className="row profile-section">
                <div className="col-lg-12 mt-1 mb-4">
                  <div className="card c-border-box-outline">
                    <div className="profile-banner">
                      <img
                        src={CBanner04}
                        alt="community-banner-bg"
                        className="community-banner-img"
                      />
                      <div
                        className="edit-profile-user-img cursor-pointer"
                        onClick={() => this.cleaAttachment()}
                      //data-bs-toggle="modal"
                      //data-bs-target="#EditProfile"
                      >
                        <img
                          src={EditiconFill}
                          alt="profilecoinstar-icon"
                          width="20"
                          height="20"
                           onClick={() => this.cleaAttachment()}
                        />
                      </div>
                      <div className="profile-buser-img">
                        {this.state.profileimage != '' && (
                          <img src={this.state.profileimage} alt="user pic" className='cb-profile-img' />
                        )}
                        {this.state.profileimage == '' && (
                          <img src={DummyProfileimg} alt="user pic" className='cb-profile-img' />)}
                        <div className="profilecoin">
                          <img
                            src={Communitygoldcircle}
                            alt="profilecoinstar-icon"
                            width="24"
                            height="24"
                          />
                          <span>{this.state.rank}</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p16">
                      <div className="row ">
                        <div className="col-lg-7 mt-4 p-0">
                          <div className="col-lg-12 mt-3 p-0 text-left">
                            <h5>{this.state.name}</h5>
                          </div>
                          <div className="col-lg-12 p-0 text-left">
                            <p>{this.state.userdesignation}</p>
                          </div>
                          <div className="col-lg-12 p-0 text-left float-start mb-3">
                            <p className="vcs-text float-start mb-0 cursor-pointer email-contact">
                              <a
                                className="boldsms-icon"
                                href={`mailto:${this.state.userEmailId}`}>

                                <span className="boldsms-icon">
                                  {this.state.userEmailId}
                                </span>
                              </a>

                              {/* <Mailto
              email="Innovatuon@dewa.gov.ae"
              subject="Hello & Welcome"
              body="Hello world!"
            >
              <span className="boldsms-icon">Innovatuon@dewa.gov.ae</span>
            </Mailto> */}
                            </p>
                          </div>
                          <div className="col-lg-12 p-0 text-left">
                            <div className="float-start">
                              <p className="vcs-text me-3 float-start mb-0">
                                <strong>{this.state.followingcount}</strong> {langText.following}
                              </p>
                              <p className="vcs-text me-3 float-start mb-0">
                                <strong>{this.state.followercount}</strong> {langText.followers}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5 ps-0 pr20">
                          <div className="float-end">
                            {/* <Button
                          variant="primary"
                          className="btn-navlink pf-btn me-2"
                        >
                          <NavLink   to="/">
                            <span> Follow</span>
                          </NavLink>
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className="btn-navlink pf-btn"
                        >
                          <NavLink   to="/">
                            <span> Message</span>
                          </NavLink>
                        </Button> */}
                            {/* <button
                            type="button"
                            className="btn-navlink pf-btn me-2 btn btn-primary"
                          >
                            <a className="" href="/afkari">
                              <span> Follow</span>
                            </a>
                          </button>
                          <button
                            type="button"
                            className="btn-navlink pf-btn btn btn-outline-secondary"
                          >
                            <a className="" href="/afkari">
                              <span> Message</span>
                            </a>
                          </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit profile Modal */}
              {/* <Modal
            show={this.state.isModalOpen04}
            onHide={() => this.hideShowModal04()}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-618w modal-design01"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h4>Edit Profiles</h4>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row">
                <div className="col-lg-12 edit-profile-modal-container">
                  <div className="profile-banner">
                    <div className="edit-profile-user-modal-img cursor-pointer">
                      <img
                        src={Cameraicon}
                        alt="camera-icon"
                        width="20"
                        height="20"
                      />
                    </div>

                    <div className="profile-buser-img profile-dp-modal">
                      <img src={ProfileImg13} alt="user pic" className="cb-profile-img" />
                      <div className="edit-profile-dp-img cursor-pointer">
                        <img
                          src={EditiconFill}
                          alt="edit-icon"
                          width="20"
                          height="20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" className="btn-navlink p-btn">
                <NavLink   to="/shareyouridea">
                  <span> Cancel</span>
                </NavLink>
              </Button>
              <Button variant="primary" className="btn-navlink p-btn">
                <NavLink   to="/">
                  <span> Save</span>
                </NavLink>
              </Button>
            </Modal.Footer>
          </Modal> */}

              {this.state.modalHideClass && (
                <div
                  className={`modal fade e-backdrop`}
                  id="EditProfile"
                //aria-labelledby="EditProfileLabel"
                //aria-hidden="true"
                >
                  <div className="modal-dialog modal-90w">
                    <div className="modal-content">
                      <div className="modal-header">
                        {/* <div className="row">
                      <h1
                        className="modal-title fs-5 col-lg-12 float-start"
                        id="exampleModalLabel"
                      >
                        Filter Ideas
                      </h1>
                      <p className="col-lg-12 float-start">
                        Select filters to focus on key ideas
                      </p>
                    </div> */}
                        <button
                          type="button"
                          className="btn-close btn-close-top"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => this.closeModal()}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="row">
                              <div className="col-lg-12 edit-profile-modal-container">
                                <div className="profile-banner">
                                  {/*<div className="edit-profile-user-modal-img cursor-pointer">
                                 <img
                                  src={CBanner04}
                                  alt="camera-icon"
                                  width="20"
                                  height="20"
                                />
                              </div>*/}

                                  <div className="profile-buser-img profile-dp-modal">
                                    {this.state.profileimage != '' && (
                                      <img src={this.state.profileimage} alt="user pic" className="profile-img03" />

                                    )}
                                    {this.state.profileimage == '' && (
                                      <img src={DummyProfileimg} alt="user pic" className="profile-img03" />

                                    )}
                                    <div className="edit-profile-dp-img cursor-pointer" data-bs-toggle="modal"
                                      data-bs-target="#EditProfile1">
                                      <img
                                        src={EditiconFill}
                                        alt="edit-icon"
                                        width="20"
                                        height="20"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              )}

              <div
                className="modal fade e-backdrop"
                id="EditProfile1"
                aria-labelledby="EditProfileLabel1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-90w">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <h1
                          className="modal-title fs-5 col-lg-12 float-start"
                          id="exampleModalLabel"
                        >
                          {langText.uploadprofilepicture}
                        </h1>
                        {/* <p className="col-lg-12 float-start">
                        Select filters to focus on key ideas
                      </p> */}
                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-top"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12 ebt-fileuploader mb-3">
                          <h4 className="h-sub01">{langText.attachment} </h4>

                          <form>
                            <fieldset className="upload_dropZone text-center mb-3 p-4">
                              <label
                                className="btn btn-upload "
                                htmlFor="upload_image_background01"
                              >
                                <legend className="visually-hidden">
                                  {langText.imageuploader}
                                </legend>
                                <svg width="32" height="32"></svg>
                                <p className="small my-2 col-lg-12 p-0">
                                  <strong>{langText.uploadafile}</strong>
                                  <br />
                                  <span>{langText.fileextentionmb5}</span>

                                </p>

                                <input
                                  id="upload_image_background01"
                                  onChange={this.handleChangeAttachment}
                                  data-post-name="image_background"
                                  data-post-url="https://someplace.com/image/uploads/backgrounds/"
                                  className="position-absolute invisible"
                                  type="file"
                                  multiple />





                                <div className="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                              </label>
                            </fieldset>
                          </form>
                        </div>
                      </div><div className="row">

                        {this.createAttachmentFilesListItems()}

                      </div>

                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary m-btn"
                        data-bs-dismiss="modal"
                      >
                        {langText.cancel}
                      </button>
                      <button type="button" className="btn btn-primary m-btn" onClick={() => this.onImageSubmit()} data-bs-dismiss="modal">
                        {langText.save}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

              <div className="row m-0">
                <div className="col-lg-12 p-0 mb-3 mt-2">
                  <h2 className="main-heading02">{langText.achievements}</h2>
                </div>
              </div>

              <div className="row m-0">
                <div className="col-lg-12 p-0 mt-0 mb-4">
                  <div className="row equal-height">
                    <div className="col-lg-4 mb-4">
                      <div className="ach-grey-box">
                        <img
                          src={AchievementsRank}
                          className="acheivements-icon"
                          alt="acheivements-icon"
                          width="24"
                          height="24"
                        />
                        <p className="ach-title">{langText.rank1}</p>
                        <h6 className="acheivements-nunmber">{this.state.rank}</h6>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                      <div className="ach-grey-box">
                        <img
                          src={AchievementsSubmitted}
                          className="acheivements-icon"
                          alt="acheivements-icon"
                          width="24"
                          height="24"
                        />
                        <p className="ach-title">{langText.submittedideas}</p>
                        <h6 className="acheivements-nunmber">{this.state.
                          submittedcount}</h6>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                      <div className="ach-grey-box">
                        <img
                          src={AchievementsEvaluatedIdeas}
                          className="acheivements-icon"
                          alt="acheivements-icon"
                          width="24"
                          height="24"
                        />
                        <p className="ach-title">{langText.evaluatedideas}</p>
                        <h6 className="acheivements-nunmber">{this.state.evaluatedcount
                        }</h6>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                      <div className="ach-grey-box">
                        <img
                          src={AchievementsImplementedIdeas}
                          className="acheivements-icon"
                          alt="acheivements-icon"
                          width="24"
                          height="24"
                        />
                        <p className="ach-title">{langText.implementedideas}</p>
                        <h6 className="acheivements-nunmber">{this.state.implementedcount}</h6>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                      <div className="ach-grey-box">
                        <img
                          src={AchievementsInnovationPoints}
                          className="acheivements-icon"
                          alt="acheivements-icon"
                          width="24"
                          height="24"
                        />
                        <p className="ach-title">{langText.innovationpoints}</p>
                        <h6 className="acheivements-nunmber">{this.state.totalscore
                        }</h6>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                      <div className="ach-grey-box">
                        <img
                          src={AchievementsRewards}
                          className="acheivements-icon"
                          alt="acheivements-icon"
                          width="24"
                          height="24"
                        />
                        <p className="ach-title">{langText.rewards}</p>
                        <h6 className="acheivements-nunmber">{this.state.rewardedcount}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6  mt-0 mb-4">
                  <h2 className="main-heading02">{langText.about}</h2>
                </div>
                <div className="col-lg-6  mt-0 mb-4">
                  <div className="float-end">
                    <p
                      className="vcs-text-green float-start mb-0 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#EditAbout">
                      <span className="ms-2">{langText.edit}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="modal fade e-backdrop"
                id="EditAbout"
                aria-labelledby="EditAboutLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-e modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <h1
                          className="modal-title fs-5 col-lg-12 float-start"
                          id="exampleModalLabel"
                        >
                          {langText.about}
                        </h1>

                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-top"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12">


                          <div className="row">
                            <div className="col-lg-12 mb-3">
                              <div className="col-lg-12 p-0 floating-message-box ta-underline">
                                <div className="col-lg-12">
                                  <div className="form-floating">
                                    <TextField
                                      className="form-control h-auto"
                                      label={langText.aboutme}
                                      multiline
                                      rows={3}
                                      value={this.state.about}
                                      onChange={(e, newValue) => this.onChangeabout(e, newValue)}
                                    />
                                    {/* <label>About me</label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary m-btn"
                        data-bs-dismiss="modal"
                      >
                        {langText.cancel}
                      </button>
                      <button type="button" className="btn btn-primary m-btn" data-bs-dismiss="modal" onClick={() => this.onSave()}>
                        {langText.save}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 position-relative mb-5">
                  <div className="h-border-box-outline">
                    <div className="col-lg-12 p-0">
                      <h3 className="h-idea-heading">
                        {this.state.about}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6  mt-0 mb-4">
                  <h2 className="main-heading02">{langText.skills}</h2>

                </div>





                <div className="col-lg-6  mt-0 mb-4">
                  <div className="float-end">
                    <p
                      className="vcs-text-green float-start mb-0 cursor-pointer"

                      data-bs-toggle="modal"
                      data-bs-target="#EditSkills"
                    >
                      <span className="ms-2">{langText.edit}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="modal fade e-backdrop"
                id="EditSkills"
                aria-labelledby="EditSkillsabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-e modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <h1
                          className="modal-title fs-5 col-lg-12 float-start"
                          id="exampleModalLabel"
                        >
                          {langText.skills}
                        </h1>

                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-top"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12">


                          <div className="row">
                            <div className="col-lg-12 mb-3">
                              <div className="col-lg-12 p-0 floating-message-box ta-underline">
                                <div className="col-lg-12">
                                  <div className="form-floating">
                                    <TextField
                                      className="form-control h-auto"
                                      label={langText.skills}
                                      multiline
                                      rows={3}
                                      value={this.state.skillText}
                                      onChange={(e, newValue) => this.onChangeSkillText(e, newValue)}
                                    />
                                    {/* <label>About me</label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary m-btn"
                        data-bs-dismiss="modal"
                      >
                        {langText.cancel}
                      </button>
                      <button type="button" className="btn btn-primary m-btn" data-bs-dismiss="modal" onClick={() => this.UpdateSkillDetails()}>
                        {langText.save}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade e-backdrop"
                id="EditSkills1"
                aria-labelledby="EditAboutLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-e modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <h1
                          className="modal-title fs-5 col-lg-12 float-start"
                          id="exampleModalLabel"
                        >
                          {langText.pleaseselectskills}
                        </h1>

                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-top"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12">

                          <div className="row">
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}

                              >
                                <Checkbox label={langText.programmingandcoding}

                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Programming and Coding")}
                                />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.graphicdesign}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Graphic Design")} />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.dataanalysis}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Data Analysis")}
                                />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.languages}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Languages")}
                                />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.photography}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Photography")}
                                />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.publicspeaking}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Public Speaking")}
                                />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.photoshooting}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "Photo shooting")}
                                />
                              </Stack>
                            </div>



                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.uidesign}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "UI Design")}
                                />
                              </Stack>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <Stack tokens={stackTokens}>
                                <Checkbox label={langText.uxresearch}
                                  onChange={(e, newValue) => this.onChangeSkill(e, newValue, "UX Research")}
                                />
                              </Stack>
                            </div>




                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary m-btn"
                        data-bs-dismiss="modal"
                      >
                        {langText.cancel}
                      </button>
                      <button type="button" className="btn btn-primary m-btn" data-bs-dismiss="modal" onClick={() => this.onSave()}>
                        {langText.save}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-lg-12 p-1 clearfix">
                  {this.state.skill.map((item: any) => (
                    <span className="p-badge ms-2 float-start cursor-pointer badge rounded-pill text-dark bg-light">
                      <span>
                        <a aria-current="page" className="active" href="#">
                          {item}
                        </a>
                      </span>
                    </span>))}

                </div>
              </div>

              {/* <div className="row">
              <div className="col-lg-12">
                <span className="h-see-more">see more...</span>
              </div>
            </div> */}

              <div className="row">
                <div className="col-lg-12 mt-0">
                  <h2 className="main-heading02">{langText.youractivities}</h2>
                </div>
              </div>

              <div className="row ps-tab">
                <div className="col-lg-12 mt-2 mb-4">
                  <div className="card">
                    <nav>
                      <div
                        className="nav nav-tabs mb-3"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className="nav-link active"
                          id="nav-first-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-first"
                          type="button"
                          role="tab"
                          aria-controls="nav-first"
                          aria-selected="true"
                        >
                          {" "}
                          {langText.ideas} <span>({this.state.allIdeaList.length})</span>
                        </button>
                        <button
                          className="nav-link"
                          id="nav-second-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-second"
                          type="button"
                          role="tab"
                          aria-controls="nav-second"
                          aria-selected="false"
                        >
                          {" "}
                          {langText.votes} <span>({this.state.voteIdeaList.length})</span>
                        </button>
                        <button
                          className="nav-link"
                          id="nav-third-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-third"
                          type="button"
                          role="tab"
                          aria-controls="nav-third"
                          aria-selected="false"
                        >
                          {" "}
                          {langText.comments} <span>({this.state.commentIdeaList.length})</span>
                        </button>
                        <button
                          className="nav-link"
                          id="nav-fourth-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-fourth"
                          type="button"
                          role="tab"
                          aria-controls="nav-fourth"
                          aria-selected="false"
                        >
                          {" "}
                          {langText.drafts} <span>({this.state.allDraftIdeaList.length})</span>
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade active show"
                        id="nav-first"
                        role="tabpanel"
                        aria-labelledby="nav-first-tab"
                      >
                        <div className="row mt-3">
                          <div className="col-lg-12 position-relative">
                            <hr className="border-topr" />
                            <div className="small-drop">

                              <div className="dropdown">
                                <div className="dropdown drop-white-space d-flex align-items-center">
                                  {langText.profileshow}
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
                                      <a onClick={() => this.getmyideas(0, "", this.state.recent)} className="dropdown-item" >
                                        {" "}
                                        {langText.recent}
                                      </a>
                                      <hr className="dropdown-divider" role="separator" />
                                      <a onClick={() => this.getmyideas(0, "IMPLEMENTED", this.state.implemented)} className="dropdown-item" >
                                        {" "}
                                        {langText.implemented}
                                      </a>
                                      <hr className="dropdown-divider" role="separator" />
                                      <a onClick={() => this.getmyideas(0, "LATEST SUBMISSIONS", this.state.latestsubmissions)} className="dropdown-item" href="#">
                                        {" "}
                                        {langText.latestsubmissions}
                                      </a>
                                      <hr className="dropdown-divider" role="separator" />
                                      <a onClick={() => this.getmyideas(0, "OLD SUBMISSIONS", this.state.oldsubmissions)} className="dropdown-item" href="#">
                                        {" "}
                                        {langText.oldsubmissions}
                                      </a>
                                      <hr className="dropdown-divider" role="separator" />
                                      <a onClick={() => this.getmyideas(0, "MOST LIKED", this.state.mostliked)} className="dropdown-item" href="#">
                                        {" "}
                                        {langText.mostliked}
                                      </a>
                                      <hr className="dropdown-divider" role="separator" />
                                      <a onClick={() => this.getmyideas(0, "MOST COMMENTS", this.state.mostcomments)} className="dropdown-item" href="#">
                                        {" "}
                                        {langText.mostcomments}
                                      </a>
                                    </div>
                                  </a>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* {this.state.allIdeaList.length ==0 &&(
<div className="row">
            <div className="col-lg-12 position-relative">
            <div className="h-border-box-outline mt-4 no-data">
            <div className="card">
  <img src={NoDataicon} className="card-img-top mx-auto d-block" alt="no-data-img"/>
  <div className="card-body pb-0">
    <h3 className='text-center'>No Data Available</h3>
  </div>
</div>
            </div>

            </div>
            </div>
)} */}
                        {this.state.allIdeaList.map((item: any) => (
                          <div className="row mb-4" key={item.ideaid}>
                            <div className="col-lg-12 position-relative">
                              <div className="h-border-box cursor-pointer" onClick={() => this.redirectInnerPage(item.ideaid)}>
                                <div className="col-lg-12 p-0">
                                  <div className="d-flex">
                                    <div className="flex-shrink-0">
                                      {this.state.profileAttachments[item.submitteremailid] && this.state.profileAttachments[item.submitteremailid].map((attachment: profileAttachment) => (
                                        <img
                                          className="profile-img03"
                                          src={attachment.imageUrl}
                                          alt="user pic"
                                        />))} </div>
                                    <div className="flex-grow-1 ms-3">
                                      {this.state.designationList[item.ideaowner] && this.state.designationList[item.ideaowner].map((item1: userDesignation) => (
                                        <h4 className="profile-name-text01">{item1.name}</h4>
                                      ))}
                                      {this.state.designationList[item.ideaowner] && this.state.designationList[item.ideaowner].map((item1: userDesignation) => (
                                        <h5 className="grey-text02">
                                          {item1.designation}
                                        </h5>))}
                                      <h5 className="grey-text02">
                                        <img
                                          src={Globeicon}
                                          alt="edit-icon"
                                          width="12"
                                          height="12"
                                          className="float-start mt-1-5"
                                        />
                                        <span className="ms-2 mt-1 float-start">
                                          {this.formatDate(item.enteredon)}
                                        </span>{" "}
                                        {/* <span className="mt-1 float-start">
                                      .ID: {this.getYearFromDate(item.enteredon)}-{item.ideaid}
                                    </span> */}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 p-0">
                                  <h3 className="h-idea-heading mt-4">
                                    {item.ideatitle}
                                  </h3>
                                </div>
                                {/* <div className="col-lg-12 p-0">
                            <ul className='himage-gallery'>
                            {this.state.attachments[item.ideaid] && this.state.attachments[item.ideaid].map((attachment: Attachment) => (
                          <li>
                            <img key={attachment.imageUrl} src={attachment.imageUrl} alt="attachment" />
                          </li>
                        ))}
                            </ul>
                          </div> */}
                                <div className="col-lg-12 p-0">
                                  <ul className='himage-gallery'>
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

                                        ))} </>
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

                                {/* <div className="col-lg-12 p-0">
                              <img
                                className="img-fluid mt-1 banner-img"
                                src={HomeBanner01}
                                alt="banner pic"
                              />
                            </div> */}
                                <div className="col-lg-12">
                                  <hr className="border-topr" />
                                </div>

                                <div className="col-lg-12">
                                  <div className="clearfix">
                                    <div className="float-end">
                                      <p className="vcs-text me-3 float-start mb-0">
                                        {item.cntvote} {langText.vote}
                                      </p>
                                      <p className="vcs-text me-3 float-start mb-0">
                                        {item.cntcomment} {langText.comments}
                                      </p>
                                      <p className="vcs-text float-start mb-0">
                                        {item.cntshare} {langText.shares}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <hr className="border-topr" />
                                </div>

                                <div className="col-lg-12">
                                  <div className="clearfix">
                                    <div className="float-start">
                                      {/* <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">
                                    <div className="vote-icon">
                                      <span>Vote</span>
                                    </div>
                                  </p> */}
                                      {item.uservote == "0" && (
                                        <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">

                                          <div onClick={() => this.submitVote(item.ideaid, "1", "0", item.enteredby, item.ideatitle, item.userbookmark, 0)} className="vote-icon">
                                            <span>{langText.vote}</span>
                                          </div>
                                        </p>
                                      )}
                                      {item.uservote == "1" && (
                                        <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">

                                          <div onClick={() => this.submitVote(item.ideaid, "0", "1", item.enteredby, item.ideatitle, item.userbookmark, 0)} className="vote-green-icon">
                                            <span>{langText.voted}</span>
                                          </div>
                                        </p>
                                      )}
                                      <p onClick={() => this.toggleCommentShow(item.ideaid)} className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">
                                        <img
                                          src={Commenticon}
                                          alt="edit-icon"
                                          width="20"
                                          height="20"
                                        />
                                        <span className="ms-2">{langText.comment}</span>
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
                                              <span className="ms-2">
                                                Share
                                              </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <Dropdown.Item href="#/action-1">
                                                <img
                                                  src={Sharecopylinkicon}
                                                  alt="edit-icon"
                                                  width="24"
                                                  height="24"
                                                />
                                                <span className="ms-2">
                                                  Copy Link
                                                </span>
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
                                          <button
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
                                            <span className="ms-2">{langText.share}</span>
                                          </button>
                                          <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">
                                              <img
                                                src={Sharecopylinkicon}
                                                alt="edit-icon"
                                                width="24"
                                                height="24"
                                              />
                                              <span className="ms-2" onClick={() => this.handleCopy(item.ideaid, item.uservote, !item.uservote, item.ideaowner, item.ideatitle, item.userbookmark, 1)}>
                                                {langText.copylink}
                                              </span>
                                            </a>
                                            <hr
                                              className="dropdown-divider"
                                              role="separator"
                                            />
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
                                      {item.userbookmark == 1 && (
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
                                      </div>
                                    )}

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
                                                    {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                      <h4 className="profile-name-text02">
                                                        {item.name}
                                                      </h4>))}
                                                    {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                      <h5 className="grey-text03">
                                                        {item.designation}
                                                      </h5>))}
                                                  </div>
                                                  <div className="col-lg-4">
                                                    <div className="float-end">
                                                      {/* <h5 className="grey-text03  float-start">{this.formatTimeElapsed(commentItem.enteredon)}</h5> */}
                                                      <h5 className="grey-text03  float-start"> {this.formatDate(commentItem.enteredon)}</h5>
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
                                                                    <span className="ms-2 dc-red"> {langText.delete}</span>
                                                                  </a>
                                                                  <hr
                                                                    className="dropdown-divider"
                                                                    role="separator" /></>)}
                                                              {this.loggedInUser.toLowerCase() == commentItem.submitteremailid.toLowerCase() && (

                                                                <><a onClick={() => this.toggleReplyShowtextBox(commentItem.comments, commentItem.commentid)} className="dropdown-item cursor-pointer">
                                                                  <img
                                                                    src={editcomment}
                                                                    alt="edit-icon"
                                                                    width="24"
                                                                    height="24"
                                                                  />
                                                                  <span className="ms-2 dc-dark"> {langText.edit}</span>
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
                                          </p> onClick={() => this.getIdeaReplyComment(commentItem.commentid)}*/}
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
                                                          {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                            <h4 className="profile-name-text02">
                                                              {item.name}
                                                            </h4>
                                                          ))}
                                                          {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                            <h5 className="grey-text03">{item.designation}</h5>
                                                          ))}
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
                                                                          <span className="ms-2 dc-red"> {langText.delete}</span>
                                                                        </a>
                                                                        <hr
                                                                          className="dropdown-divider"
                                                                          role="separator" /></>)}
                                                                    {this.loggedInUser.toLowerCase() == replyStage1CommentItem.submitteremailid.toLowerCase() && (


                                                                      <><a className="dropdown-item"
                                                                        onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid, replyStage1CommentItem.repliesid, replyStage1CommentItem.comments)}>
                                                                        <img
                                                                          src={editcomment}
                                                                          alt="edit-icon"
                                                                          width="24"
                                                                          height="24"
                                                                        />
                                                                        <span className="ms-2 dc-dark"> {langText.edit}</span>
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
                                                    <div className="float-start">
                                                      {/* <p className="vcs-text-dark me-3 ms-3 float-start mb-0 cursor-pointer">
                          <img
                            src={Voteicon}
                            alt="edit-icon"
                            width="20"
                            height="20"
                          />
                          <span className="ms-2">{replyStage1CommentItem.uservotecount}</span>
                        </p> */}
                                                    </div>
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
                                                  onKeyPress={(e) => this.handleKeyPressReplyComment(e, commentItem.commentid, item.ideaid)}
                                                />
                                              </div>

                                            </div>)}
                                          {/* Reply section sample */}
                                          {this.state.allReplyCommentList.map((replycommentItem: any) => (
                                            <div className="col-lg-12 position-relative" >
                                              <div className="h-border-box-reply">
                                                {/* <div className="col-lg-12 input-with-img">
                                      <div className="mb-3 mt-4 input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                          <img
                                            className="profile-img02"
                                            src={ProfileImg14}
                                            alt="user pic"
                                          />
                                        </span>
                                        <TextField
                                          placeholder="Share your thoughts"
                                          className="form-control"

                                        />
                                      </div>
                                    </div> */}

                                                {/* <div className="col-lg-12 position-relative">
                                      <div className="h-border-box-reply">
                                        <div className="col-lg-12 p-0">
                                          <div className="d-flex">
                                            <div className="flex-shrink-0">
                                              <img
                                                className="profile-img04"
                                                src={ProfileImg02}
                                                alt="user pic"
                                              />
                                            </div>
                                            <div className="flex-grow-1 ms-2">
                                              <div className="row">
                                                <div className="col-lg-8">
                                                  <h4 className="profile-name-text02">
                                                    {replycommentItem.submittername}
                                                  </h4>
                                                  <h5 className="grey-text03">
                                                    Sr Specialist - Investments
                                                  </h5>
                                                </div>
                                                <div className="col-lg-4">
                                                  <div className="float-end">
                                                    <h5 className="grey-text03  float-start">1d ago</h5>
                                                    <div className="small-drop-e float-start">
                                                      <div className="dropdown">
                                                        <button
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
                                                        </button>
                                                        <div className="dropdown-menu">
                                                          <a className="dropdown-item cursor-pointer"
                                                          onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid,replycommentItem.repliesid,replycommentItem.comments)}>
                                                            Edit
                                                          </a>
                                                          <hr
                                                            className="dropdown-divider"
                                                            role="separator"
                                                          />
                                                          <a className="dropdown-item cursor-pointer" onClick={() => this.SubmitReplyForIdeaComment( commentItem.commentid,replycommentItem.repliesid,0, "DELETE")} >
                                                            Delete
                                                          </a>
                                                          <hr
                                                            className="dropdown-divider"
                                                            role="separator"
                                                          />
                                                          <a className="dropdown-item cursor-pointer" onClick={() => this.reportStage2CommentId(item.ideaid, commentItem.commentid,replycommentItem.repliesid,item.ideatitle,item.ideaowner,replycommentItem.comments)}>
                                      Report
                                                          </a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>


                                      </div>
                                      <div className="col-lg-12 p-3 grey-box-reply mt-2">
                                        {(this.state.isReply2ShowtextBox[replycommentItem.repliesid] &&
                    <h3 className="h-idea-heading-reply mb-0">
                     {replycommentItem.comments}{" "}
                    </h3>)}
                    {(this.state.isReply2ShowtextBox[replycommentItem.repliesid] &&
                  <TextField
                    placeholder="Edit Comment"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="form-control"
                    value={this.state.editReplyComment}
                     onChange={(e, newValue) => this.onChangeReplyEditComment(e, newValue)}
                      onKeyPress={(e) => this.handleKeyPressReplyEditComment(e, commentItem.commentid,replycommentItem.repliesid)}
                  />)}
                                        </div>

                                    </div> */}



                                                {/* <div className="col-lg-12 position-relative" >
                                      <div className="h-border-box-reply">
                                        <div className="col-lg-12 input-with-img">
                                          <div className="mb-3 mt-4 input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                              <img
                                                className="profile-img02"
                                                src={ProfileImg14}
                                                alt="user pic"
                                              />
                                            </span>
                                            <TextField
                                              placeholder="Share your thoughts"
                                              className="form-control"

                                            />
                                          </div>
                                        </div>


                                      </div>
                                    </div> */}
                                              </div>
                                            </div>
                                          ))}
                                          {/* Reply section sample */}
                                        </div>

                                        {/* )} */}

                                      </div>


                                    ))}




                                    {/* <!-- "Load More" button --> */}
                                    {this.state.isCommentLoadMore && (
                                      <button onClick={() => this.loadMoreComments(item.ideaid)}>{langText.loadmore}</button>
                                    )}

                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-second"
                        role="tabpanel"
                        aria-labelledby="nav-second-tab"
                      >
                        <div className="row mt-3">
                          <div className="col-lg-12 position-relative">
                            <div className="h-border-box-outline">
                              <div className="col-lg-12 p-0">
                                <h3 className="h-idea-heading">
                                  {/* {this.state.voteIdeaList.length ==0 &&(
<div className="row">
            <div className="col-lg-12 position-relative">
            <div className="h-border-box-outline mt-4 no-data">
            <div className="card">
  <img src={NoDataicon} className="card-img-top mx-auto d-block" alt="no-data-img"/>
  <div className="card-body pb-0">
    <h3 className='text-center'>No Data Available</h3>
  </div>
</div>
            </div>

            </div>
            </div>
)} */}
                                  {this.state.voteIdeaList.map((item: any) => (
                                    <div className="row" key={item.ideaid}>
                                      <div className="col-lg-12 position-relative">
                                        <div className="h-border-box-fill cursor-pointer">
                                          <div className="col-lg-12 p-0">
                                            <div className="d-flex">
                                              <div className="flex-shrink-0">
                                                {this.state.profileAttachments[item.submitteremailid] && this.state.profileAttachments[item.submitteremailid].map((attachment: profileAttachment) => (
                                                  <img
                                                    className="profile-img03"
                                                    src={attachment.imageUrl}
                                                    alt="user pic"
                                                  />))} </div>
                                              <div className="flex-grow-1 ms-3">
                                                {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item1: userDesignation) => (
                                                  <h4 className="profile-name-text01">{item1.name}</h4>
                                                ))}
                                                {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item1: userDesignation) => (
                                                  <h5 className="grey-text02">
                                                    {item1.designation}
                                                  </h5>))}
                                                <h5 className="grey-text02">
                                                  <img
                                                    src={Globeicon}
                                                    alt="edit-icon"
                                                    width="12"
                                                    height="12"
                                                    className="float-start mt-1-5"
                                                  />
                                                  <span className="ms-2 mt-1 float-start">
                                                    {this.formatDate(item.enteredon)}
                                                  </span>{" "}
                                                  {/* <span className="mt-1 float-start">
                                      .ID: {this.getYearFromDate(item.enteredon)}-{item.ideaid}
                                    </span> */}
                                                </h5>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 p-0">
                                            <h3 className="h-idea-heading mt-4">
                                              {item.ideatitle}
                                            </h3>
                                          </div>
                                          <div className="col-lg-12 p-0">
                                            <ul className='himage-gallery'>
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

                                                  ))} </>
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
                                          {/* <div className="col-lg-12 p-0">
                              <img
                                className="img-fluid mt-1 banner-img"
                                src={HomeBanner01}
                                alt="banner pic"
                              />
                            </div> */}
                                          <div className="col-lg-12">
                                            <hr className="border-topr" />
                                          </div>

                                          <div className="col-lg-12">
                                            <div className="clearfix">
                                              <div className="float-end">
                                                <p className="vcs-text me-3 float-start mb-0">
                                                  {item.cntvote} {langText.vote}
                                                </p>
                                                <p className="vcs-text me-3 float-start mb-0">
                                                  {item.cntcomment} {langText.comments}
                                                </p>
                                                <p className="vcs-text float-start mb-0">
                                                  {item.cntshare} {langText.shares}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-lg-12">
                                            <hr className="border-topr" />
                                          </div>

                                          <div className="col-lg-12">
                                            <div className="clearfix">
                                              <div className="float-start">
                                                <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">
                                                  <div className="vote-green-icon" onClick={() => this.submitVote(item.ideaid, "0", "1", item.enteredby, item.ideatitle, item.userbookmark, 0)}>
                                                    <span>{langText.voted}</span>
                                                  </div>
                                                </p>
                                                <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer" onClick={() => this.toggleCommentShow(item.ideaid)} >
                                                  <img
                                                    src={Commenticon}
                                                    alt="edit-icon"
                                                    width="20"
                                                    height="20"
                                                  />
                                                  <span className="ms-2">{langText.comment}</span>
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
                                              <span className="ms-2">
                                                Share
                                              </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <Dropdown.Item href="#/action-1">
                                                <img
                                                  src={Sharecopylinkicon}
                                                  alt="edit-icon"
                                                  width="24"
                                                  height="24"
                                                />
                                                <span className="ms-2">
                                                  Copy Link
                                                </span>
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
                                                    <button
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
                                                      <span className="ms-2">{langText.share}</span>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                      <a className="dropdown-item" href="#">
                                                        <img
                                                          src={Sharecopylinkicon}
                                                          alt="edit-icon"
                                                          width="24"
                                                          height="24"
                                                        />
                                                        <span className="ms-2" onClick={() => this.handleCopy(item.ideaid, item.uservote, !item.uservote, item.ideaowner, item.ideatitle, item.userbookmark, 1)}>
                                                          {langText.copylink}
                                                        </span>
                                                      </a>
                                                      <hr
                                                        className="dropdown-divider"
                                                        role="separator"
                                                      />
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
                                                  </div>
                                                </p>
                                              </div>
                                              <div className="float-end">
                                                <p className="vcs-text float-start mb-0 cursor-pointer">
                                                  {/* <Link id="t-3" title="Bookmark">
                          <ToastComponent />
                        </Link>{" "} */}
                                                  <a href="" className="bookmarks-icon" />
                                                </p>
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
                                                  </div>
                                                )}

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
                                                                  {/* <h5 className="grey-text03  float-start">{this.formatTimeElapsed(commentItem.enteredon)}</h5> */}
                                                                  <h5 className="grey-text03  float-start"> {this.formatDate(commentItem.enteredon)}</h5>
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
                                                                                <span className="ms-2 dc-red"> {langText.delete}</span>
                                                                              </a>
                                                                              <hr
                                                                                className="dropdown-divider"
                                                                                role="separator" /></>)}
                                                                          {this.loggedInUser.toLowerCase() == commentItem.submitteremailid.toLowerCase() && (


                                                                            <><a onClick={() => this.toggleReplyShowtextBox(commentItem.comments, commentItem.commentid)} className="dropdown-item cursor-pointer">
                                                                              <img
                                                                                src={editcomment}
                                                                                alt="edit-icon"
                                                                                width="24"
                                                                                height="24"
                                                                              />
                                                                              <span className="ms-2 dc-dark"> {langText.edit}</span>
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
                                          </p> onClick={() => this.getIdeaReplyComment(commentItem.commentid)}*/}
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
                                                                        </h4>
                                                                      ))}
                                                                      {this.state.designationList[replyStage1CommentItem.submitteremailid] && this.state.designationList[replyStage1CommentItem.submitteremailid].map((item: userDesignation) => (
                                                                        <h5 className="grey-text03">{item.designation}</h5>
                                                                      ))}
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
                                                                                      <span className="ms-2 dc-red"> {langText.delete}</span>
                                                                                    </a>
                                                                                    <hr
                                                                                      className="dropdown-divider"
                                                                                      role="separator" /></>)}
                                                                                {this.loggedInUser.toLowerCase() == replyStage1CommentItem.submitteremailid.toLowerCase() && (


                                                                                  <><a className="dropdown-item"
                                                                                    onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid, replyStage1CommentItem.repliesid, replyStage1CommentItem.comments)}>
                                                                                    <img
                                                                                      src={editcomment}
                                                                                      alt="edit-icon"
                                                                                      width="24"
                                                                                      height="24"
                                                                                    />
                                                                                    <span className="ms-2 dc-dark"> {langText.edit}</span>
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
                                                                <div className="float-start">
                                                                  {/* <p className="vcs-text-dark me-3 ms-3 float-start mb-0 cursor-pointer">
                          <img
                            src={Voteicon}
                            alt="edit-icon"
                            width="20"
                            height="20"
                          />
                          <span className="ms-2">{replyStage1CommentItem.uservotecount}</span>
                        </p> */}
                                                                </div>
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
                                                              onKeyPress={(e) => this.handleKeyPressReplyComment(e, commentItem.commentid, item.ideaid)}
                                                            />
                                                          </div>

                                                        </div>)}
                                                      {/* Reply section sample */}
                                                      {this.state.allReplyCommentList.map((replycommentItem: any) => (
                                                        <div className="col-lg-12 position-relative" >
                                                          <div className="h-border-box-reply">
                                                            {/* <div className="col-lg-12 input-with-img">
                                      <div className="mb-3 mt-4 input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                          <img
                                            className="profile-img02"
                                            src={ProfileImg14}
                                            alt="user pic"
                                          />
                                        </span>
                                        <TextField
                                          placeholder="Share your thoughts"
                                          className="form-control"

                                        />
                                      </div>
                                    </div> */}

                                                            {/* <div className="col-lg-12 position-relative">
                                      <div className="h-border-box-reply">
                                        <div className="col-lg-12 p-0">
                                          <div className="d-flex">
                                            <div className="flex-shrink-0">
                                              <img
                                                className="profile-img04"
                                                src={ProfileImg02}
                                                alt="user pic"
                                              />
                                            </div>
                                            <div className="flex-grow-1 ms-2">
                                              <div className="row">
                                                <div className="col-lg-8">
                                                  <h4 className="profile-name-text02">
                                                    {replycommentItem.submittername}
                                                  </h4>
                                                  <h5 className="grey-text03">
                                                    Sr Specialist - Investments
                                                  </h5>
                                                </div>
                                                <div className="col-lg-4">
                                                  <div className="float-end">
                                                    <h5 className="grey-text03  float-start">1d ago</h5>
                                                    <div className="small-drop-e float-start">
                                                      <div className="dropdown">
                                                        <button
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
                                                        </button>
                                                        <div className="dropdown-menu">
                                                          <a className="dropdown-item cursor-pointer"
                                                          onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid,replycommentItem.repliesid,replycommentItem.comments)}>
                                                            Edit
                                                          </a>
                                                          <hr
                                                            className="dropdown-divider"
                                                            role="separator"
                                                          />
                                                          <a className="dropdown-item cursor-pointer" onClick={() => this.SubmitReplyForIdeaComment( commentItem.commentid,replycommentItem.repliesid,0, "DELETE")} >
                                                            Delete
                                                          </a>
                                                          <hr
                                                            className="dropdown-divider"
                                                            role="separator"
                                                          />
                                                          <a className="dropdown-item cursor-pointer" onClick={() => this.reportStage2CommentId(item.ideaid, commentItem.commentid,replycommentItem.repliesid,item.ideatitle,item.ideaowner,replycommentItem.comments)}>
                                      Report
                                                          </a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>


                                      </div>
                                      <div className="col-lg-12 p-3 grey-box-reply mt-2">
                                        {(this.state.isReply2ShowtextBox[replycommentItem.repliesid] &&
                    <h3 className="h-idea-heading-reply mb-0">
                     {replycommentItem.comments}{" "}
                    </h3>)}
                    {(this.state.isReply2ShowtextBox[replycommentItem.repliesid] &&
                  <TextField
                    placeholder="Edit Comment"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="form-control"
                    value={this.state.editReplyComment}
                     onChange={(e, newValue) => this.onChangeReplyEditComment(e, newValue)}
                      onKeyPress={(e) => this.handleKeyPressReplyEditComment(e, commentItem.commentid,replycommentItem.repliesid)}
                  />)}
                                        </div>

                                    </div> */}



                                                            {/* <div className="col-lg-12 position-relative" >
                                      <div className="h-border-box-reply">
                                        <div className="col-lg-12 input-with-img">
                                          <div className="mb-3 mt-4 input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                              <img
                                                className="profile-img02"
                                                src={ProfileImg14}
                                                alt="user pic"
                                              />
                                            </span>
                                            <TextField
                                              placeholder="Share your thoughts"
                                              className="form-control"

                                            />
                                          </div>
                                        </div>


                                      </div>
                                    </div> */}
                                                          </div>
                                                        </div>
                                                      ))}
                                                      {/* Reply section sample */}
                                                    </div>

                                                    {/* )} */}

                                                  </div>


                                                ))}




                                                {/* <!-- "Load More" button --> */}
                                                {this.state.isCommentLoadMore && (
                                                  <button onClick={() => this.loadMoreComments(item.ideaid)}>{langText.loadmore}</button>
                                                )}

                                              </div>
                                            )}
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-third"
                        role="tabpanel"
                        aria-labelledby="nav-third-tab"
                      >
                        <div className="row mt-3">
                          <div className="col-lg-12 position-relative">
                            <div className="h-border-box-outline">
                              <div className="col-lg-12 p-0">
                                <h3 className="h-idea-heading">
                                  {/* {this.state.commentIdeaList.length ==0 &&(
<div className="row">
            <div className="col-lg-12 position-relative">
            <div className="h-border-box-outline mt-4 no-data">
            <div className="card">
  <img src={NoDataicon} className="card-img-top mx-auto d-block" alt="no-data-img"/>
  <div className="card-body pb-0">
    <h3 className='text-center'>No Data Available</h3>
  </div>
</div>
            </div>

            </div>
            </div>
)} */}
                                  {this.state.commentIdeaList.map((item: any) => (
                                    <div className="row" key={item.ideaid}>
                                      <div className="col-lg-12 position-relative">
                                        <div className="h-border-box-fill cursor-pointer">
                                          <div className="col-lg-12 p-0">
                                            <div className="d-flex">
                                              <div className="flex-shrink-0">
                                                {this.state.profileAttachments[item.submitteremailid] && this.state.profileAttachments[item.submitteremailid].map((attachment: profileAttachment) => (
                                                  <img
                                                    className="profile-img03"
                                                    src={attachment.imageUrl}
                                                    alt="user pic"
                                                  />))} </div>
                                              <div className="flex-grow-1 ms-3">
                                                {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item1: userDesignation) => (
                                                  <h4 className="profile-name-text01">{item1.name}</h4>
                                                ))}
                                                {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item1: userDesignation) => (
                                                  <h5 className="grey-text02">
                                                    {item1.designation}
                                                  </h5>))}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 p-0">
                                            <h3 className="h-idea-heading mt-4">
                                              {item.ideatitle}
                                            </h3>
                                          </div>
                                          <div className="col-lg-12 p-0">
                                            <ul className='himage-gallery'>
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

                                                  ))} </>
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
                                          {/* <div className="col-lg-12 p-0">
                              <img
                                className="img-fluid mt-1 banner-img"
                                src={HomeBanner01}
                                alt="banner pic"
                              />
                            </div> */}
                                          <div className="col-lg-12">
                                            <hr className="border-topr" />
                                          </div>

                                          <div className="col-lg-12">
                                            <div className="clearfix">
                                              <div className="float-end">
                                                <p className="vcs-text me-3 float-start mb-0">
                                                  {item.cntvote} {langText.vote}
                                                </p>
                                                <p className="vcs-text me-3 float-start mb-0">
                                                  {item.cntcomment} {langText.comments}
                                                </p>
                                                <p className="vcs-text float-start mb-0">
                                                  {item.cntshare} {langText.shares}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-lg-12">
                                            <hr className="border-topr" />
                                          </div>

                                          <div className="col-lg-12">
                                            <div className="clearfix">
                                              <div className="float-start">
                                                {item.uservote == "0" && (
                                                  <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">

                                                    <div onClick={() => this.submitVote(item.ideaid, "1", "0", item.enteredby, item.ideatitle, item.userbookmark, 0)} className="vote-icon">
                                                      <span>{langText.vote}</span>
                                                    </div>
                                                  </p>
                                                )}
                                                {item.uservote == "1" && (
                                                  <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer">

                                                    <div onClick={() => this.submitVote(item.ideaid, "0", "1", item.enteredby, item.ideatitle, item.userbookmark, 0)} className="vote-green-icon">
                                                      <span>{langText.voted}</span>
                                                    </div>
                                                  </p>
                                                )}
                                                <p className="vcs-text-dark me-4 float-start mb-0 cursor-pointer" onClick={() => this.toggleCommentShow(item.ideaid)}>
                                                  <img
                                                    src={Commenticon}
                                                    alt="edit-icon"
                                                    width="20"
                                                    height="20"
                                                  />
                                                  <span className="ms-2">{langText.comment}</span>
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
                                              <span className="ms-2">
                                                Share
                                              </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <Dropdown.Item href="#/action-1">
                                                <img
                                                  src={Sharecopylinkicon}
                                                  alt="edit-icon"
                                                  width="24"
                                                  height="24"
                                                />
                                                <span className="ms-2">
                                                  Copy Link
                                                </span>
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
                                                    <button
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
                                                      <span className="ms-2">{langText.share}</span>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                      <a className="dropdown-item" href="#">
                                                        <img
                                                          src={Sharecopylinkicon}
                                                          alt="edit-icon"
                                                          width="24"
                                                          height="24"
                                                        />
                                                        <span className="ms-2" onClick={() => this.handleCopy(item.ideaid, item.uservote, !item.uservote, item.ideaowner, item.ideatitle, item.userbookmark, 1)}>
                                                          {langText.copylink}
                                                        </span>
                                                      </a>
                                                      <hr
                                                        className="dropdown-divider"
                                                        role="separator"
                                                      />
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
                                                  </div>
                                                </p>
                                              </div>
                                              <div className="float-end">
                                                <p className="vcs-text float-start mb-0 cursor-pointer">
                                                  {/* <Link id="t-3" title="Bookmark">
                          <ToastComponent />
                        </Link>{" "} */}
                                                  <a href="" className="bookmarks-icon" />
                                                </p>
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
                                                </div>
                                              )}

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
                                                              {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                                <h4 className="profile-name-text02">
                                                                  {item.name}
                                                                </h4>))}
                                                              {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                                <h5 className="grey-text03">
                                                                  {item.designation}
                                                                </h5>))}
                                                            </div>
                                                            <div className="col-lg-4">
                                                              <div className="float-end">
                                                                {/* <h5 className="grey-text03  float-start">{this.formatTimeElapsed(commentItem.enteredon)}</h5> */}
                                                                <h5 className="grey-text03  float-start"> {this.formatDate(commentItem.enteredon)}</h5>
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
                                                                              <span className="ms-2 dc-red"> {langText.delete}</span>
                                                                            </a>
                                                                            <hr
                                                                              className="dropdown-divider"
                                                                              role="separator" /></>)}
                                                                        {this.loggedInUser.toLowerCase() == commentItem.submitteremailid.toLowerCase() && (


                                                                          <><a onClick={() => this.toggleReplyShowtextBox(commentItem.comments, commentItem.commentid)} className="dropdown-item cursor-pointer">
                                                                            <img
                                                                              src={editcomment}
                                                                              alt="edit-icon"
                                                                              width="24"
                                                                              height="24"
                                                                            />
                                                                            <span className="ms-2 dc-dark"> {langText.edit}</span>
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
                                          </p> onClick={() => this.getIdeaReplyComment(commentItem.commentid)}*/}
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
                                                                    {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                                      <h4 className="profile-name-text02">
                                                                        {item.name}
                                                                      </h4>
                                                                    ))}
                                                                    {this.state.designationList[item.submitteremailid] && this.state.designationList[item.submitteremailid].map((item: userDesignation) => (
                                                                      <h5 className="grey-text03">{item.designation}</h5>
                                                                    ))}
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
                                                                                    <span className="ms-2 dc-red"> {langText.delete}</span>
                                                                                  </a>
                                                                                  <hr
                                                                                    className="dropdown-divider"
                                                                                    role="separator" /></>)}
                                                                              {this.loggedInUser.toLowerCase() == replyStage1CommentItem.submitteremailid.toLowerCase() && (


                                                                                <><a className="dropdown-item"
                                                                                  onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid, replyStage1CommentItem.repliesid, replyStage1CommentItem.comments)}>
                                                                                  <img
                                                                                    src={editcomment}
                                                                                    alt="edit-icon"
                                                                                    width="24"
                                                                                    height="24"
                                                                                  />
                                                                                  <span className="ms-2 dc-dark"> {langText.edit}</span>
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
                                                              <div className="float-start">
                                                                {/* <p className="vcs-text-dark me-3 ms-3 float-start mb-0 cursor-pointer">
                          <img
                            src={Voteicon}
                            alt="edit-icon"
                            width="20"
                            height="20"
                          />
                          <span className="ms-2">{replyStage1CommentItem.uservotecount}</span>
                        </p> */}
                                                              </div>
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
                                                            onKeyPress={(e) => this.handleKeyPressReplyComment(e, commentItem.commentid, item.ideaid)}
                                                          />
                                                        </div>

                                                      </div>)}
                                                    {/* Reply section sample */}
                                                    {this.state.allReplyCommentList.map((replycommentItem: any) => (
                                                      <div className="col-lg-12 position-relative" >
                                                        <div className="h-border-box-reply">
                                                          {/* <div className="col-lg-12 input-with-img">
                                      <div className="mb-3 mt-4 input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                          <img
                                            className="profile-img02"
                                            src={ProfileImg14}
                                            alt="user pic"
                                          />
                                        </span>
                                        <TextField
                                          placeholder="Share your thoughts"
                                          className="form-control"

                                        />
                                      </div>
                                    </div> */}

                                                          {/* <div className="col-lg-12 position-relative">
                                      <div className="h-border-box-reply">
                                        <div className="col-lg-12 p-0">
                                          <div className="d-flex">
                                            <div className="flex-shrink-0">
                                              <img
                                                className="profile-img04"
                                                src={ProfileImg02}
                                                alt="user pic"
                                              />
                                            </div>
                                            <div className="flex-grow-1 ms-2">
                                              <div className="row">
                                                <div className="col-lg-8">
                                                  <h4 className="profile-name-text02">
                                                    {replycommentItem.submittername}
                                                  </h4>
                                                  <h5 className="grey-text03">
                                                    Sr Specialist - Investments
                                                  </h5>
                                                </div>
                                                <div className="col-lg-4">
                                                  <div className="float-end">
                                                    <h5 className="grey-text03  float-start">1d ago</h5>
                                                    <div className="small-drop-e float-start">
                                                      <div className="dropdown">
                                                        <button
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
                                                        </button>
                                                        <div className="dropdown-menu">
                                                          <a className="dropdown-item cursor-pointer"
                                                          onClick={() => this.toggleEditReplyShowtextBox(commentItem.commentid,replycommentItem.repliesid,replycommentItem.comments)}>
                                                            Edit
                                                          </a>
                                                          <hr
                                                            className="dropdown-divider"
                                                            role="separator"
                                                          />
                                                          <a className="dropdown-item cursor-pointer" onClick={() => this.SubmitReplyForIdeaComment( commentItem.commentid,replycommentItem.repliesid,0, "DELETE")} >
                                                            Delete
                                                          </a>
                                                          <hr
                                                            className="dropdown-divider"
                                                            role="separator"
                                                          />
                                                          <a className="dropdown-item cursor-pointer" onClick={() => this.reportStage2CommentId(item.ideaid, commentItem.commentid,replycommentItem.repliesid,item.ideatitle,item.ideaowner,replycommentItem.comments)}>
                                      Report
                                                          </a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>


                                      </div>
                                      <div className="col-lg-12 p-3 grey-box-reply mt-2">
                                        {(this.state.isReply2ShowtextBox[replycommentItem.repliesid] &&
                    <h3 className="h-idea-heading-reply mb-0">
                     {replycommentItem.comments}{" "}
                    </h3>)}
                    {(this.state.isReply2ShowtextBox[replycommentItem.repliesid] &&
                  <TextField
                    placeholder="Edit Comment"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="form-control"
                    value={this.state.editReplyComment}
                     onChange={(e, newValue) => this.onChangeReplyEditComment(e, newValue)}
                      onKeyPress={(e) => this.handleKeyPressReplyEditComment(e, commentItem.commentid,replycommentItem.repliesid)}
                  />)}
                                        </div>

                                    </div> */}



                                                          {/* <div className="col-lg-12 position-relative" >
                                      <div className="h-border-box-reply">
                                        <div className="col-lg-12 input-with-img">
                                          <div className="mb-3 mt-4 input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                              <img
                                                className="profile-img02"
                                                src={ProfileImg14}
                                                alt="user pic"
                                              />
                                            </span>
                                            <TextField
                                              placeholder="Share your thoughts"
                                              className="form-control"

                                            />
                                          </div>
                                        </div>


                                      </div>
                                    </div> */}
                                                        </div>
                                                      </div>
                                                    ))}
                                                    {/* Reply section sample */}
                                                  </div>

                                                  {/* )} */}

                                                </div>


                                              ))}




                                              {/* <!-- "Load More" button --> */}
                                              {this.state.isCommentLoadMore && (
                                                <button onClick={() => this.loadMoreComments(item.ideaid)}>{langText.loadmore}</button>
                                              )}

                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-fourth"
                        role="tabpanel"
                        aria-labelledby="nav-fourth-tab"
                      >
                        <div className="row mt-3">
                          <div className="col-lg-12 position-relative">
                            <div className="h-border-box-outline">
                              <div className="col-lg-12 p-0">
                                <h3 className="h-idea-heading">
                                  {/* {this.state.allDraftIdeaList.length ==0 &&(
<div className="row">
            <div className="col-lg-12 position-relative">
            <div className="h-border-box-outline mt-4 no-data">
            <div className="card">
  <img src={NoDataicon} className="card-img-top mx-auto d-block" alt="no-data-img"/>
  <div className="card-body pb-0">
    <h3 className='text-center'>No Data Available</h3>
  </div>
</div>
            </div>

            </div>
            </div>
)} */}
                                  {this.state.allDraftIdeaList.map((item: any) => (
                                    <div className="row mt-4" key={item.ideaid}>
                                      <div className="col-lg-12 position-relative">
                                        <div className="h-border-box-fill">
                                          <div className="col-lg-12 p-0">
                                            <div className="d-flex">
                                              <div className="flex-grow-1 me-2">
                                                <div className="col-lg-12 p-0">
                                                  <p className="h-lh-text-n ">
                                                    {item.ideadescr}
                                                  </p>
                                                  <p className="h-lh-text-n-date dfts-dt">
                                                    {this.formatTimeElapsed(item.enteredon)}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="flex-shrink-0">
                                                {this.getImageURL(item.ideaid).map((imageURL: any, index: any) => (
                                                  <img key={index} src={imageURL} alt={`Image ${index + 1}`} className="hnews-img" />
                                                ))}
                                                {/* <img
                    className="hnews-img"
                    src={HomeNewsimg01}
                    alt="user pic"
                  /> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}


                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
