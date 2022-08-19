import React, {Dispatch, FC, SetStateAction, useCallback, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { setImageToServer } from "../../ActionCreators";
import { ErrorMessage } from "../../../../common/components/error-message/error-message";

import s from "./AddImage.module.scss";

interface IAddTeamImage {
    imageUrl: string;
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
}

const acceptOptions = [".jpeg", ".jpg", ".png"];

export const AddImage:FC<IAddTeamImage> = ({ imageUrl, avatar, setAvatar }) => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.authorizationReducer);
    const { image, error, isLoading } = useAppSelector(state => state.imageReducer);

    const sendFile = useCallback(async (event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
        if (!target.files?.length) {
            return;
        }

        const file = target.files[0];

        if (!file.type.match("image")) {
            alert("Неподдерживаемый тип изображения...");
            return;
        }
        const data = new FormData();
        data.append("file", file);

        dispatch(setImageToServer({token, data}));
    }, []);

    useEffect(() => {
        if (image) {
            setAvatar(image);
        }
    }, [image]);

    console.log(image);

    return (
        <div className={s.AddImage}>
            {error && <ErrorMessage message={error} />}
            <div className={s.AddImage__imageWrapper} >
                <label className={s.customFileUpload} htmlFor="file-upload" />
                <input type="file" onChange={sendFile} accept={acceptOptions.join()} id="file-upload" className={s.upload} />
                {isLoading && <div className={s.loading} >Loading...</div>}
                {avatar || imageUrl ? <img className={s.newImage} alt="addItem" src={avatar || imageUrl} /> : ""}
            </div>
        </div>
    );
};
