import React, {Dispatch, FC, SetStateAction, useCallback, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../../core/redux/redux";
import { setImageToServer } from "../../../api/images/ImagesApiService";

import "./AddImage.scss";

interface IAddTeamImage {
    imageUrl: string;
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
}

export const AddImage:FC<IAddTeamImage> = ({ imageUrl, avatar, setAvatar }) => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.authorizationReducer);
    const { image } = useAppSelector(state => state.imageReducer);

    const sendFile = useCallback(async (event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : "";
        const data = new FormData();
        data.append("file", file);
        dispatch(setImageToServer({token, data}));
    }, []);

    useEffect(() => {
        if (image) {
            setAvatar(image);
        }
    }, [image]);

    return (
        <div className="AddImage">
            <div className="AddImage__image-wrapper" >
                <label className="custom-file-upload" htmlFor="file-upload" />
                <input type="file" onChange={sendFile} id="file-upload" className="upload" />

                {avatar || imageUrl ? <img className="new-image" alt="addItem" src={avatar || imageUrl} /> : ""}
            </div>
        </div>
    );
};
