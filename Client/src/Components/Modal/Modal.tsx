import "./Modal.css";
import { Contexts } from "../../Contexts/Contexts";

function Modal({ children }: any) {
    const { modalDisp, setModalDisp } = Contexts();

    return (
        <div className={modalDisp == 0 ? "Modal hidden" : "Modal"}>
            <div
                className={modalDisp == 0 ? "overlaymodal hidden" : "overlaymodal"}
                onClick={() => {
                    setModalDisp(0);
                }}
            ></div>
            <div className={modalDisp == 0 ? "divmodal hidden" : "divmodal"}>
                <div className="divacces">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
