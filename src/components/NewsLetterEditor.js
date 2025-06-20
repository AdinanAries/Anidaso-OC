import NLBlank from "../news-letter-blank.png";
import NLDarkular from "../news-letter-darkula.png";
import NLSlickBG from "../news-letter-slick-bg.png";
import NLLight from "../news-letter-light.png";
import NLClassicLetter from "../news-letter-classic-letter.png";
import { useEffect, useState } from "react";
import { fonts } from "../helpers/fonts";
import NewsLetterPreviewerBlank from "./NewsLetterPreviewerBlank";
import NewsLetterPreviewerSlickBg from "./NewsLetterPreviewerSlickBg";
import NewsLetterPreviewerClassicLetter from "./NewsLetterPreviewerClassicLetter";
import NewsLetterPreviewerDarkular from "./NewsLetterPreviewerDarkular";
import NewsLetterPreviewerLight from "./NewsLetterPreviewerLight";
import { 
    createNewsLetterState, 
    fetchNewsLetterStateByAgentAndTemplateName 
} from "../services/newsLetterServices";
import { event } from "jquery";

const NewsLetterEditor = (props) => {

    const {
        isEditMode,
        userDetails,
        currentDesign,
        setCurrentDesign,
        handleDragStart,
        removeElement,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleDragEnd,
        containerFocusEvent,
        textFocusEvent,
        textHighlightEvent,
        lastSelection,
        setLastSelection,
        lastRange, 
        setLastRange,
        lastFocusedElement, 
        setLastFocusedElement,
        newSettingsSpan, 
        setNewSettingsSpan,
        lastFocusedIcon, 
        setlastFocusedIcon,
        currentElemToolsState,
        setCurrentElemToolsState,
        bindNewsLetterElemEvents,
        applyNewsLetterChanges,
        showCampaignPage,
        newsLetterSendObj, 
        setNewsLetterSendObj,
    } = props;

    const [ newsLetterPostData, setNewsLetterPostData ] = useState({
        oc_user_id: userDetails?._id,
        template_name: "",
        saved_state: ""
    });
    const [ isSaving, setIsSaving ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isDefaultTemplate, setisDefaultTemplate ] = useState((currentDesign?.db_obj?._id ? false : true));

    useEffect(()=>{
        (async()=>{
            if(
                newsLetterPostData?.oc_user_id &&
                newsLetterPostData?.template_name && 
                newsLetterPostData?.saved_state
            ){
                setIsSaving(true);
                let __res = await createNewsLetterState(newsLetterPostData);
                setIsSaving(false);
            }
        })();
    }, [newsLetterPostData])

    useEffect(()=>{
        if(!isEditMode){
            document.getElementById("news_letter_current_editable_page").innerHTML=currentDesign?.string_snap_shot;
            document.getElementById("news_letter_current_editable_page").querySelectorAll("*").forEach(element => {
                element.contentEditable = false;
                element.tabIndex=1; 
                if(element.classList.contains("nl-button-container")){
                    let btn_url = element.querySelector(".nl-button-url-input-elem").innerText;
                    element.querySelector(".nl-button-hyper-tag").href=btn_url;
                }
                if(element.classList.contains("nl-button-hyper-tag")){
                    element.onclick=null;
                }
                if(element.classList.contains("nl-focusable-container-elem")){
                    element.classList.remove("nl-focusable-container-elem")
                }
                if(element.classList.contains("nl-focusable-text")){
                    element.classList.remove("nl-focusable-text")
                }
                if(element.classList.contains("nl-highlightable-text")){
                    element.classList.remove("nl-highlightable-text")
                }
                if(element.classList.contains("nl-page-elem-delete-button")){
                    element.remove();
                }
                if(element.classList.contains("nl-button-settings-container")){
                    element.remove();
                }
            });
        }else{
            if(currentDesign?.string_snap_shot){
                document.getElementById("news_letter_current_editable_page").innerHTML=currentDesign?.string_snap_shot;
                document.getElementById("news_letter_current_editable_page").querySelectorAll("*").forEach(element => {
                    if(element.classList.contains("nl-page-elem-delete-button")){
                        if(!element.onclick)
                            element.addEventListener("click", removeElement);
                    }
                });
            }
            bindNewsLetterElemEvents();
        }
    }, []);

    const changeTemplate = async (template, use_default=false) => {
        setIsLoading(true);
        let _tt="";
        let __res={};
        if(!use_default){
            __res=await fetchNewsLetterStateByAgentAndTemplateName(userDetails?._id, template);
            _tt=__res?.saved_state;
            setisDefaultTemplate(false);
        }
        if(_tt){
            document.getElementById("news_letter_current_editable_page").innerHTML=_tt;
        }
        if(use_default || !_tt){
            setisDefaultTemplate(true);
        }
        if(!_tt){
            if(template === "blank"){
                let _tt=NewsLetterPreviewerBlank({
                    userDetails,
                    isEditMode,
                    currentElemToolsState,
                });
                document.getElementById("news_letter_current_editable_page").innerHTML=_tt;
            }
            if(template === "darkula"){
                let _tt=NewsLetterPreviewerDarkular({
                    userDetails,
                    isEditMode,
                    currentElemToolsState,
                });
                document.getElementById("news_letter_current_editable_page").innerHTML=_tt;                     
            }
            if(template === "slickbg"){
                let _tt=NewsLetterPreviewerSlickBg({
                    userDetails,
                    isEditMode,
                    currentElemToolsState,
                });
                document.getElementById("news_letter_current_editable_page").innerHTML=_tt;
            }
            if(template === "classicletter"){
                let _tt=NewsLetterPreviewerClassicLetter({
                    userDetails,
                    isEditMode,
                    currentElemToolsState,
                });
                document.getElementById("news_letter_current_editable_page").innerHTML=_tt;
            }
            if(template === "light"){
                let _tt=NewsLetterPreviewerLight({
                    userDetails,
                    isEditMode,
                    currentElemToolsState,
                });
                document.getElementById("news_letter_current_editable_page").innerHTML=_tt;
            }
        }
        setCurrentDesign({
            ...currentDesign,
            db_obj: __res,
            string_snap_shot: _tt,
            changes_history: [_tt],
            current_template: template,
        });
        setIsLoading(false);

        //setTimeout(applyNewsLetterChanges, 200);
    }

    const toolsBackgroundColorOnInput = (e) => {
        e.preventDefault();
        setCurrentElemToolsState({
            ...currentElemToolsState,
            containerBackground: e.target.value
        });
        if(lastFocusedElement)
            lastFocusedElement.style.backgroundColor=e.target.value;
    }

    const toolsTextColorOnchange = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            textColor: e.target.value
        });
        if(newSettingsSpan)
            newSettingsSpan.style.color=e.target.value;
        if(lastFocusedIcon)
            lastFocusedIcon.style.color=e.target.value;
    }

    const toolsHighlightColorOnInput = (e) => {
        e.preventDefault();
        setCurrentElemToolsState({
            ...currentElemToolsState,
            highlightColor: e.target.value
        });
        
        if(newSettingsSpan)
            newSettingsSpan.style.backgroundColor=e.target.value;
        //lastRange.surroundContents(span);
    }

    const getHighlightedText = () => {
        const selection = window.getSelection();
        alert(selection);
        return selection.toString();
    }

    const boldTextOnClick = () => {

        let fontWeight="";
        let _bool=false;
        if(currentElemToolsState.isBold){
            fontWeight="initial";
            _bool=false;
        }else{
            fontWeight="bolder";
            _bool=true;
        }
        newSettingsSpan.style.fontWeight=fontWeight;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isBold: _bool,
        });
        //lastSelection.removeAllRanges(); // Clear selection
    }

    const underlineTextOnClick = () => {
        if(currentElemToolsState.isUnderline){
            newSettingsSpan.style.textDecoration="none";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                isUnderline: false,
            });
        }else{
            newSettingsSpan.style.textDecoration="underline";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                isUnderline: true,
            });
        }
    }

    const italizeTextOnClick = () => {
        let fontStyle="initial";
        let _bool=false;
        if(currentElemToolsState.isItalic){
            fontStyle="initial";
            _bool=false;
        }else{
            fontStyle="italic";
            _bool=true;
        }
        if(newSettingsSpan)
            newSettingsSpan.style.fontStyle=fontStyle;
        //newSettingsSpan.classList.remove('highlighted');
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isItalic: _bool,
        });
    }

    const alignTextOnclick = (type=1) => {
        // 1 => left, 2 => center, 3 => right, 4 => justify
        if(type===1){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="left";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "left"
            });
        }else if(type===2){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="center";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "center"
            });
        }else if(type===3){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="right";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "right"
            });
        }else if(type===4){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="justify";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "justify"
            });
        }

    }

    const fontSizeOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: e.target.value
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontSize=(e.target.value+"px");
        //lastRange.surroundContents(span);
    }

    const incrementFont = () => {
        const __size = (currentElemToolsState?.fontSize+1);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: __size
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontSize=(__size+"px");
    }

    const decrementFont = () => {
        const __size = (currentElemToolsState?.fontSize-1);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: __size
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontSize=(__size+"px");
    }

    const fontOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontFamily: e.target.value
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontFamily=e.target.value;
    }

    const paddingSideOnInput = (e) => {
        let _ps = parseInt(e.target.value);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                paddingSide: _ps
            }
        });
    }

    const paddingOnInput = (e) => {
        let _side = currentElemToolsState?.boxModel?.paddingSide;
        let _pv = e.target.value;
        let _pp = {};
        if(_side===1){
            _pp = {
                padding: _pv
            }
            if(lastFocusedElement)
                lastFocusedElement.style.padding=(_pv+"px");
        }
        if(_side===2){
            _pp = {
                paddingTop: _pv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.paddingTop=(_pv+"px");
        }
        if(_side===3){
            _pp = {
                paddingLeft: _pv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.paddingLeft=(_pv+"px");
        }
        if(_side===4){
            _pp = {
                paddingRight: _pv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.paddingRight=(_pv+"px");
        }
        if(_side===5){
            _pp = {
                paddingBottom: _pv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.paddingBottom=(_pv+"px");
        }
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                ..._pp
            }
        });
    }

    const marginSideOnInput = (e) => {
        let _ms = parseInt(e.target.value);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                marginSide: _ms
            }
        });
    }

    const marginOnInput = (e) => {
        let _side = currentElemToolsState?.boxModel?.marginSide;
        let _mv = e.target.value;
        let _mm = {};
        if(_side===1){
            _mm = {
                margin: _mv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.margin=(_mv+"px");
        }
        if(_side===2){
            _mm = {
                marginTop: _mv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.marginTop=(_mv+"px");
        }
        if(_side===3){
            _mm = {
                marginLeft: _mv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.marginLeft=(_mv+"px");
        }
        if(_side===4){
            _mm = {
                marginRight: _mv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.marginRight=(_mv+"px");
        }
        if(_side===5){
            _mm = {
                marginBottom: _mv
            };
            if(lastFocusedElement)
                lastFocusedElement.style.marginBottom=(_mv+"px");
        }
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                ..._mm
            }
        });
        
    }

    const alignVerticalOnChange = (e) => {
        let _vv = e.target.value;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                display: "flex",
                alignItems: _vv
            }
        });
        if(lastFocusedElement){
            lastFocusedElement.style.display='flex';
            lastFocusedElement.style.alignItems=_vv;
        }
    }

    const alignHorizontalOnchange = (e) => {
        let _vv = e.target.value;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                display: "flex",
                justifyContent: _vv
            }
        });
        if(lastFocusedElement){
            lastFocusedElement.style.display='flex';
            lastFocusedElement.style.justifyContent=_vv;
        }
    }

    const flexDirectionOnChange = (e) => {
        let _dd = e.target.value;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                display: "flex",
                flexDirection: _dd,
            }
        });
        if(lastFocusedElement){
            lastFocusedElement.style.display='flex';
            lastFocusedElement.style.flexDirection=_dd;
        }
    }

    const onSave = () => {
        applyNewsLetterChanges();
        setNewsLetterPostData({
            oc_user_id: userDetails?._id,
            template_name: currentDesign?.current_template,
            saved_state: document.getElementById("news_letter_current_editable_page").innerHTML,
        });
    }

    const unDo = () => {
        let __history = currentDesign?.changes_history;
        let __redo_stack = currentDesign?.redo_changes_stack;
        let __page = __history.pop();
        if(__page){
            __redo_stack.push(__page);
            setCurrentDesign({
                ...currentDesign,
                string_snap_shot: __page,
                changes_history: __history,
                redo_changes_stack: __redo_stack,
            });
            document.getElementById("news_letter_current_editable_page").innerHTML=__page;
            bindNewsLetterElemEvents();
        }
    }

    const reDo = () => {
        let __redo_stack = currentDesign?.redo_changes_stack;
        let __history = currentDesign?.changes_history;
        let __page = __redo_stack.pop();
        if(__page){
            __history.push(__page);
            setCurrentDesign({
                ...currentDesign,
                string_snap_shot: __page,
                changes_history: __history,
                redo_changes_stack: __redo_stack,
            });
            document.getElementById("news_letter_current_editable_page").innerHTML=__page;
            bindNewsLetterElemEvents();
        }
    }

    return <div style={{background: "white", padding: 5, borderRadius: 9}}>
        {
            isEditMode &&
            <>
                <div className="nl-editor-top-tools-container" style={{display: "flex", justifyContent: "center", alignItems: "center", background: "rgb(237, 237, 237)"}}>
                    <div style={{display: "flex", borderRight: "1px solid rgba(0,0,0,0.1)", marginRight: 10, paddingRight: 10}}>
                        {
                            !isDefaultTemplate &&
                            <div onClick={()=>changeTemplate(currentDesign?.current_template, true)} disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                                <i style={{color: "darkslateblue"}} className="fa-solid fa-file-circle-check"></i>
                                <div className="tool-tip"
                                    style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                                    Use Default
                                </div>
                            </div>
                        }
                        <div onClick={onSave} disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                            <i className="fa-solid fa-floppy-disk"></i>
                            <div className="tool-tip"
                                style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                                Save Changes
                            </div>
                        </div>
                        <div onClick={unDo} disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                            <i className="fa-solid fa-rotate-left"></i>
                            <div className="tool-tip"
                                style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                                Undo Changes
                            </div>
                        </div>
                        <div onClick={reDo} disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                            <i className="fa-solid fa-rotate-right"></i>
                            <div className="tool-tip"
                                style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                                Redo Changes
                            </div>
                        </div>
                    </div>
                    <div disabled onClick={boldTextOnClick}  style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.isBold ? "rgba(0,0,0,0.07)" : "none"}} className="tool-tip-parent">
                        <i className="fa-solid fa-bold"></i>
                        <div className="tool-tip"
                            style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Bold Text
                        </div>
                    </div>
                    <div disabled onClick={italizeTextOnClick} style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.isItalic ? "rgba(0,0,0,0.07)" : "none"}} className="tool-tip-parent">
                        <i className="fa-solid fa-italic"></i>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Italize Text
                        </div>
                    </div>
                    <div disabled onClick={underlineTextOnClick} style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.isUnderline ? "rgba(0,0,0,0.07)" : "none"}} className="tool-tip-parent">
                        <i className="fa-solid fa-underline"></i>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 100, textAlign: "center"}}>
                            Underline Text
                        </div>
                    </div>
                    <div style={{width: 40}} className="tool-tip-parent">
                        <div style={{textAlign: "center"}}>
                            <label htmlFor="nl_editor_text_color_input">
                                <p style={{position: "relative", zIndex: 1}}>
                                    <i className="fa-solid fa-a"></i>
                                </p>
                            </label>
                            <p style={{marginTop: -10}}>
                                <input onInput={toolsTextColorOnchange}
                                    id="nl_editor_text_color_input"
                                    type="color" name="toolsColor" 
                                    value={currentElemToolsState?.textColor} 
                                    style={{height: 5, border: "none", padding: 0, margin: "auto", width: 30}}
                                />
                            </p>
                        </div>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Text Color
                        </div>
                    </div>
                    <div style={{padding: 10, textAlign: "center"}} className="tool-tip-parent">
                            <label htmlFor="nl_editor_highlighter_color_input">
                                <p style={{position: "relative", zIndex: 1}}>
                                    <i className="fa-solid fa-highlighter"></i>
                                </p>
                            </label>
                            <p style={{marginTop: -10}}>
                                <input onInput={toolsHighlightColorOnInput}
                                    id="nl_editor_highlighter_color_input"
                                    type="color" name="toolsColor" 
                                    value={currentElemToolsState?.highlightColor} 
                                    style={{height: 5, border: "none", padding: 0, margin: "auto", width: 30}}
                                />
                            </p>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 100, textAlign: "center"}}>
                            Text Highlight
                        </div>
                    </div>
                    <div className="tool-tip-parent" style={{display: "flex", alignItems: "center", borderLeft: "1px solid rgba(0,0,0,0.1)", marginLeft: 10, marginRight: 10, padding: "0 10px"}}>
                        <div onClick={decrementFont} style={{marginRight: 10}}>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <input onInput={fontSizeOnInput}
                            value={currentElemToolsState?.fontSize} 
                            type="number"
                            style={{padding: 5, width: 60, textAlign: "center"}} />
                        <div onClick={incrementFont} style={{marginLeft: 10}}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Font Size
                        </div>
                    </div>
                    <div className="tool-tip-parent" style={{display: "flex", borderLeft: "1px solid rgba(0,0,0,0.1)", marginLeft: 10, marginRight: 10, padding: "0 10px"}}>
                        <select onInput={fontOnInput}
                            style={{border: "none", background: "none", padding: 10}}>
                            {
                                fonts?.map(each=>{
                                    return <option value={each}>
                                            {each}</option>
                                })
                                
                            }
                        </select>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Font
                        </div>
                    </div>
                    <div style={{display: "flex", borderLeft: "1px solid rgba(0,0,0,0.1)", marginLeft: 10, marginRight: 10, padding: "0 10px"}}>
                        <div onClick={()=>alignTextOnclick(1)} className="tool-tip-parent" 
                            style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.textAlign==="left" ? "rgba(0,0,0,0.07)" : "none"}}>
                            <i className="fa-solid fa-align-left"></i>
                            <div className="tool-tip"
                                style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                                Align Left
                            </div>
                        </div>
                        <div onClick={()=>alignTextOnclick(2)} className="tool-tip-parent" 
                            style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.textAlign==="center" ? "rgba(0,0,0,0.07)" : "none"}}>
                            <i className="fa-solid fa-align-center"></i>
                            <div className="tool-tip"
                                style={{color: "black", fontSize: 12, minWidth: 90, textAlign: "center"}}>
                                Align Center
                            </div>
                        </div>
                        <div onClick={()=>alignTextOnclick(3)} className="tool-tip-parent" 
                            style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.textAlign==="right" ? "rgba(0,0,0,0.07)" : "none"}}>
                            <i className="fa-solid fa-align-right"></i>
                            <div className="tool-tip"
                                style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                                Align Right
                            </div>
                        </div>
                        <div onClick={()=>alignTextOnclick(4)} className="tool-tip-parent" 
                            style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.textAlign==="justify" ? "rgba(0,0,0,0.07)" : "none"}}>
                            <i className="fa-solid fa-align-justify"></i>
                            <div className="tool-tip"
                                style={{color: "black", fontSize: 12, minWidth: 90, textAlign: "center"}}>
                                Align Justify
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", borderLeft: "1px solid rgba(0,0,0,0.1)", marginRight: 10, padding: "0 10px"}}>
                        <p style={{marginRight: 10, fontSize: 11}}>
                            <label htmlFor="nl_editor_container_background_input" 
                                style={{color: "rgba(0,0,0,0.4"}}>
                                Background:</label>
                        </p>
                        <input id="nl_editor_container_background_input"
                            onInput={toolsBackgroundColorOnInput}
                            type="color" name="favcolor" 
                            value={currentElemToolsState?.containerBackground} />
                    </div>
                </div>
                {
                    isSaving &&
                    <div style={{backgroundColor: "#eee", padding: 5, textAlign: "center",
                        fontSize: 12, borderTop: "1px solid rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "green"}} className="fa fa-spinner"></i>
                        Saving in progress...
                    </div>
                }
                {
                    isLoading &&
                    <div style={{backgroundColor: "#eee", padding: 5, textAlign: "center",
                        fontSize: 12, borderTop: "1px solid rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "green"}} className="fa fa-spinner"></i>
                        Loading, Please wait...
                    </div>
                }
            </>
        }
        <div style={{display: "flex", justifyContent: isEditMode ? "space-between" : "center"}}>
            {
                isEditMode &&
                <div style={{width: "calc(100% - 750px)", background: "rgba(0,0,0,0.07)"}}>
                    <h1 style={{margin: 15, maxWidth: 200, color: "rgb(110, 0, 97)", display: "none"}}>
                        Pick a Template to Design Your News Letter!</h1>
                    <div style={{display: "flex", backgroundColor: "rgb(69, 0, 61)", justifyContent: "center"}}>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "yellow", textDecoration: "underline"}}>
                            All Categories
                        </p>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "grey", cursor: "not-allowed"}}>
                            Travel
                        </p>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "grey", cursor: "not-allowed"}}>
                            Tours
                        </p>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "grey", cursor: "not-allowed"}}>
                            Packages
                        </p>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", padding: 3}}>
                        <div onClick={()=>changeTemplate("blank")} style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NLBlank}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                {
                                    currentDesign?.current_template==="blank" &&
                                    <div style={{backgroundColor: "green", color: "white", top: 0, right: 0, borderRadius: "100%", position: "absolute", width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                }
                            </div>
                        </div>
                        <div onClick={()=>changeTemplate("classicletter")} style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NLClassicLetter}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                {
                                    currentDesign?.current_template==="classicletter" &&
                                    <div style={{backgroundColor: "green", color: "white", top: 0, right: 0, borderRadius: "100%", position: "absolute", width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                }
                            </div>
                        </div>
                        <div onClick={()=>changeTemplate("darkula")} style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NLDarkular}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                {
                                    currentDesign?.current_template==="darkula" &&
                                    <div style={{backgroundColor: "green", color: "white", top: 0, right: 0, borderRadius: "100%", position: "absolute", width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                }
                            </div>
                        </div>
                        <div onClick={()=>changeTemplate("slickbg")} style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NLSlickBG}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                {
                                    currentDesign?.current_template==="slickbg" &&
                                    <div style={{backgroundColor: "green", color: "white", top: 0, right: 0, borderRadius: "100%", position: "absolute", width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                }
                            </div>
                        </div>
                        <div onClick={()=>changeTemplate("light")} style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NLLight}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                {
                                    currentDesign?.current_template==="light" &&
                                    <div style={{backgroundColor: "green", color: "white", top: 0, right: 0, borderRadius: "100%", position: "absolute", width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !isEditMode &&
                <div style={{padding: 5}}>
                    <h1 style={{margin: 15, maxWidth: 200, color: "rgb(110, 0, 97)"}}>
                        Preview News Letter Before Send!</h1>
                    <div onClick={showCampaignPage} style={{marginTop: 10, textDecoration: "underline", cursor: "pointer"}}>
                        <i style={{marginRight: 10}} className="fa-solid fa-pencil"></i>
                        Got Back to Edit
                    </div>
                </div>
            }
            <div id="news_letter_current_editable_page" style={{maxWidth: 650, background: "white", border: isEditMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                {
                    /**New Letter Content Goes Here */
                }
            </div>
            {
                isEditMode &&
                <div style={{width: 150, padding: 10, textAlign: "center", backgroundColor: "rgb(55, 7, 49)"}}>
                    <p style={{fontSize: 13, padding: 10, color: "orange", textDecoration: "underline"}}>
                        Elements</p>
                    <div draggable onDragStart={(e) => handleDragStart(e, "button")} style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-link"></i>
                            Button</p>
                    </div>
                    <div draggable onDragStart={(e) => handleDragStart(e, "p")} style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-paragraph"></i>
                            Paragraph</p>
                    </div>
                    <div draggable onDragStart={(e) => handleDragStart(e, "h1")} style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-heading"></i>
                            Heading</p>
                    </div>
                    <div draggable onDragStart={(e) => handleDragStart(e, "img")} style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-image"></i>
                            Image</p>
                    </div>
                    <div draggable onDragStart={(e) => handleDragStart(e, "div")} style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-expand"></i>
                            Section</p>
                    </div>
                    <p style={{fontSize: 13, padding: 10, marginTop: 10, color: "orange", textDecoration: "underline"}}>
                        Box Model</p>
                    <div style={{padding: 10, marginBottom: 2, color: "lightgreen", background: "rgba(0,0,0,0.2)", borderRadius: 5}}>
                        <p style={{fontSize: 13, marginBottom: 5}}>
                            Padding
                        </p>
                        <select onInput={paddingSideOnInput}
                            value={currentElemToolsState?.paddingSide}
                            style={{textAlign: "center", padding: 10, background: "none", border: "none", width: "100%", color: "white"}}>
                            <option value="1" style={{color: "black"}}>all Sides</option>
                            <option value="2" style={{color: "black"}}>top</option>
                            <option value="3" style={{color: "black"}}>left</option>
                            <option value="4" style={{color: "black"}}>right</option>
                            <option value="5" style={{color: "black"}}>bottom</option>
                        </select>
                        <p>
                            {
                                currentElemToolsState?.boxModel?.paddingSide===1 &&
                                <input onInput={paddingOnInput}
                                    value={currentElemToolsState?.boxModel?.padding}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.paddingSide===2 &&
                                <input onInput={paddingOnInput}
                                    value={currentElemToolsState?.boxModel?.paddingTop}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.paddingSide===3 &&
                                <input onInput={paddingOnInput}
                                    value={currentElemToolsState?.boxModel?.paddingLeft}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.paddingSide===4 &&
                                <input onInput={paddingOnInput}
                                    value={currentElemToolsState?.boxModel?.paddingRight}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.paddingSide===5 &&
                                <input onInput={paddingOnInput}
                                    value={currentElemToolsState?.boxModel?.paddingBottom}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                        </p>
                    </div>
                    <div style={{padding: 10, marginBottom: 10, color: "lightgreen", background: "rgba(0,0,0,0.2)", borderRadius: 5}}>
                        <p style={{fontSize: 13, marginBottom: 5}}>
                            Margin
                        </p>
                        <select onInput={marginSideOnInput}
                            value={currentElemToolsState?.marginSide}
                            style={{textAlign: "center", padding: 10, background: "none", border: "none", width: "100%", color: "white"}}>
                            <option value="1" style={{color: "black"}}>all Sides</option>
                            <option value="2" style={{color: "black"}}>top</option>
                            <option value="3" style={{color: "black"}}>left</option>
                            <option value="4" style={{color: "black"}}>right</option>
                            <option value="5" style={{color: "black"}}>bottom</option>
                        </select>
                        <p>
                            {
                                currentElemToolsState?.boxModel?.marginSide===1 &&
                                <input onInput={marginOnInput}
                                    value={currentElemToolsState?.boxModel?.margin}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.marginSide===2 &&
                                <input onInput={marginOnInput}
                                    value={currentElemToolsState?.boxModel?.marginTop}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.marginSide===3 &&
                                <input onInput={marginOnInput}
                                    value={currentElemToolsState?.boxModel?.marginLeft}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.marginSide===4 &&
                                <input onInput={marginOnInput}
                                    value={currentElemToolsState?.boxModel?.marginRight}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                            {
                                currentElemToolsState?.boxModel?.marginSide===5 &&
                                <input onInput={marginOnInput}
                                    value={currentElemToolsState?.boxModel?.marginBottom}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    maxWidth: "100%", textAlign: "center"}} type="number" />
                            }
                        </p>
                    </div>
                    <p style={{fontSize: 13, padding: 10, marginTop: 10, color: "orange", textDecoration: "underline"}}>
                        Box Alignment</p>
                    <div style={{marginBottom: 2, color: "lightgreen", background: "rgba(0,0,0,0.2)", borderRadius: 5}}>
                        <div style={{padding: 10, color: "lightgreen"}}>
                            <p style={{fontSize: 13, marginBottom: 5}}>
                                Direction
                            </p>
                            <p>
                                <select onClick={flexDirectionOnChange}
                                    value={currentElemToolsState?.flexDirection}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    width: "100%", textAlign: "center"}}>
                                        <option value='column' style={{color: "black"}}>Top-Bottom</option>
                                        <option value='row' style={{color: "black"}}>Left-Right</option>
                                </select>
                            </p>
                        </div>
                        <div style={{padding: 10, color: "lightgreen"}}>
                            <p style={{fontSize: 13, marginBottom: 5}}>
                                Vertical
                            </p>
                            <p>
                                <select onInput={alignVerticalOnChange}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    width: "100%", textAlign: "center"}}>
                                        <option value='flex-start' style={{color: "black"}}>Top</option>
                                        <option value='center' style={{color: "black"}}>Center</option>
                                        <option value='flex-end' style={{color: "black"}}>Bottom</option>
                                </select>
                            </p>
                        </div>
                        <div style={{padding: 10, color: "lightgreen"}}>
                            <p style={{fontSize: 13, marginBottom: 5}}>
                                Horizontal
                            </p>
                            <p>
                                <select onInput={alignHorizontalOnchange}
                                    style={{border: "none", borderBottom: "2px solid lightgreen",
                                    background: "none", color: "white",
                                    width: "100%", textAlign: "center"}}>
                                        <option value='flex-start' style={{color: "black"}}>Left</option>
                                        <option value='center' style={{color: "black"}}>Center</option>
                                        <option value='flex-end' style={{color: "black"}}>Right</option>
                                </select>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>

}

export default NewsLetterEditor;