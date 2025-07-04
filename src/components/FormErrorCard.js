const FormErrorCard = (props) => {
    const { type, message, color } = props;
    return (
        <div style={{padding: 10}}>
            <p style={{fontSize: (props.fontSize || 15),
                    fontFamily: "'Prompt', Sans-serif", color: (color || "rgba(255,255,255,0.8)"), textAlign: "center"}}>
                <i style={{color: "yellow", marginRight: 10}} className="fa fa-exclamation-triangle" ></i>
                {message}
            </p>
        </div>
    );
}

export default FormErrorCard;