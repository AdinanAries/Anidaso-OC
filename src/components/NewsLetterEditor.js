import NewsLetter1 from "../newsLetter1.png";
import NLBlank from "../news-letter-blank.png";
import NLDarkular from "../news-letter-darkula.png";
import NLSlickBG from "../news-letter-slick-bg.png";
import { cloneElement, useEffect, useState } from "react";
import { fonts } from "../helpers/fonts";
import NewsLetterPreviewerDarkula from "./NewsLetterPreviewerDarkula";
import NewsLetterPreviewerBlanK from "./NewsLetterPreviewerBlank";
import NewsLetterPreviewerSlickBg from "./NewsLetterPreviewerSlickBg";
import { rgbToHex } from "../helpers/helper-functions";
import { event } from "jquery";

const NewsLetterEditor = (props) => {

    const {
        isEditMode,
        userDetails,
        currentDesign,
        setCurrentDesign,
        buttonUrlOnInput,
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
    } = props;

    useEffect(()=>{
        if(!isEditMode){
            document.getElementById("news_letter_current_editable_page").innerHTML=currentDesign?.string_snap_shot;
        }else{
            if(currentDesign?.string_snap_shot){
                document.getElementById("news_letter_current_editable_page").innerHTML=currentDesign?.string_snap_shot;
            }
            bindNewsLetterElemEvents();
        }

    }, []);

    const changeTemplate = (template) => {
        if(template === "blank"){
            setCurrentDesign({
                ...currentDesign,
                current_template: template,
                editable_react_version: <NewsLetterPreviewerBlanK
                    userDetails={userDetails}
                    isEditMode={isEditMode}
                    currentElemToolsState={currentElemToolsState}
                    handleDrop={handleDrop}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDragEnd={handleDragEnd}
                    buttonUrlOnInput={buttonUrlOnInput}
                    removeElement={removeElement}
                />
            })
        }
        if(template === "darkula"){
            setCurrentDesign({
                ...currentDesign,
                current_template: template,
                editable_react_version: <NewsLetterPreviewerDarkula
                    userDetails={userDetails}
                    isEditMode={isEditMode}
                    currentElemToolsState={currentElemToolsState}
                    handleDrop={handleDrop}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDragEnd={handleDragEnd}
                    buttonUrlOnInput={buttonUrlOnInput}
                    removeElement={removeElement}
                />
            });
                                
        }
        if(template === "slickbg"){
            setCurrentDesign({
                ...currentDesign,
                current_template: template,
                editable_react_version: <NewsLetterPreviewerSlickBg
                                    userDetails={userDetails}
                                    isEditMode={isEditMode}
                                    currentElemToolsState={currentElemToolsState}
                                    handleDrop={handleDrop}
                                    handleDragOver={handleDragOver}
                                    handleDragLeave={handleDragLeave}
                                    handleDragEnd={handleDragEnd}
                                    buttonUrlOnInput={buttonUrlOnInput}
                                    removeElement={removeElement}
                                />
            });
        }

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
        newSettingsSpan.style.textDecoration="underline";
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isUnderline: true,
        });
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

    const paddingOnInput = (e) => {
        let _pp = e.target.value;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                padding: _pp
            }
        });
        if(lastFocusedElement)
            lastFocusedElement.style.padding=(_pp+"px");
    }

    const marginOnInput = (e) => {
        let _pp = e.target.value;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            boxModel: {
                ...currentElemToolsState.boxModel,
                margin: _pp
            }
        });
        if(lastFocusedElement)
            lastFocusedElement.style.margin=(_pp+"px");
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

    const onSave = () => {
        applyNewsLetterChanges();
    }

    const unDo = () => {
        let __history = currentDesign?.changes_history;
        let __page = __history.pop();
        if(__page){
            setCurrentDesign({
                ...currentDesign,
                string_snap_shot: __page,
                changes_history: __history,
            });
            document.getElementById("news_letter_current_editable_page").innerHTML=__page;
            bindNewsLetterElemEvents();
        }
    }

    return <div style={{background: "white", padding: 5, borderRadius: 9}}>
        {
            isEditMode &&
            <div className="nl-editor-top-tools-container" style={{display: "flex", justifyContent: "center", alignItems: "center", background: "rgb(237, 237, 237)"}}>
                <div style={{display: "flex", borderRight: "1px solid rgba(0,0,0,0.1)", marginRight: 10, paddingRight: 10}}>
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
                    <div disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
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
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
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
                    <div style={{marginTop: 10, textDecoration: "underline", cursor: "pointer"}}>
                        <i style={{marginRight: 10}} className="fa-solid fa-pencil"></i>
                        Got Back to Edit
                    </div>
                </div>
            }
            <div id="news_letter_current_editable_page" style={{maxWidth: 650, background: "white", border: isEditMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                {isEditMode && currentDesign?.editable_react_version}
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
                        <select style={{textAlign: "center", padding: 10, background: "none", border: "none", width: "100%", color: "white"}}>
                            <option style={{color: "black"}}>all Sides</option>
                            <option style={{color: "black"}}>top</option>
                            <option style={{color: "black"}}>left</option>
                            <option style={{color: "black"}}>right</option>
                            <option style={{color: "black"}}>bottom</option>
                        </select>
                        <p>
                            <input onInput={paddingOnInput}
                                value={currentElemToolsState?.boxModel?.padding}
                                style={{border: "none", borderBottom: "2px solid lightgreen",
                                background: "none", color: "white",
                                maxWidth: "100%", textAlign: "center"}} type="number" />
                        </p>
                    </div>
                    <div style={{padding: 10, marginBottom: 10, color: "lightgreen", background: "rgba(0,0,0,0.2)", borderRadius: 5}}>
                        <p style={{fontSize: 13, marginBottom: 5}}>
                            Margin
                        </p>
                        <select style={{textAlign: "center", padding: 10, background: "none", border: "none", width: "100%", color: "white"}}>
                            <option style={{color: "black"}}>all Sides</option>
                            <option style={{color: "black"}}>top</option>
                            <option style={{color: "black"}}>left</option>
                            <option style={{color: "black"}}>right</option>
                            <option style={{color: "black"}}>bottom</option>
                        </select>
                        <p>
                            <input onInput={marginOnInput}
                                value={currentElemToolsState?.boxModel?.margin}
                                style={{border: "none", borderBottom: "2px solid lightgreen",
                                background: "none", color: "white",
                                maxWidth: "100%", textAlign: "center"}} type="number" />
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
                                <select
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