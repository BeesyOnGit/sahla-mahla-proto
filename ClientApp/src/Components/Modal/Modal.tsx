import "./Modal.css";

type modalType = {
    modalDisp: boolean;
    setModalDisp: Function;
    children: any;
};
function Modal({ children, modalDisp, setModalDisp }: modalType) {
    return (
        <div className={modalDisp == false ? "Modal hidden" : "Modal"}>
            <div
                className={modalDisp == false ? "overlaymodal hidden" : "overlaymodal"}
                onClick={() => {
                    setModalDisp(false);
                }}
            ></div>
            <div className={modalDisp == false ? "divmodal hidden" : "divmodal"}>
                <div className="divacces">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
