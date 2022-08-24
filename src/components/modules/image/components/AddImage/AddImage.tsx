import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import { imagesApiService } from "../../../../api/images/imagesApiService";
import { ErrorMessage } from "../../../../common/components/error-message/error-message";
import { baseUrl } from "../../../../api/authService/authService";

import s from "./AddImage.module.scss";

interface IAddTeamImage {
    imageUrl: string;
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
}

const acceptOptions = [".jpeg", ".jpg", ".png"];

export const AddImage:FC<IAddTeamImage> = ({ imageUrl, avatar, setAvatar }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [uploadImage, {data: imageData, error: addImageError, isLoading: addImageLoading}] = imagesApiService.useAddImageMutation();

    const sendFile = useCallback(async (event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
        if (!target.files?.length) {
            return;
        }

        const file = target.files[0];

        if (!file.type.match("image")) {
            setErrorMessage(true);
            return;
        }
        const data = new FormData();
        data.append("file", file);

        uploadImage(data);
    }, []);

    useEffect(() => {
        if (imageData) {
            if (errorMessage) {
                setErrorMessage(false);
            }
            setAvatar(baseUrl + imageData);
        }
    }, [imageData, errorMessage]);

    return (
        <div className={s.AddImage}>
            {addImageError && <ErrorMessage message="Не удалось загрузить фото..." />}
            {errorMessage && <ErrorMessage message="Неподдерживаемый тип изображения..." />}
            <label className={s.AddImage__imageWrapper} htmlFor="file-upload" >
                <div className={s.customFileUpload} />
                <input type="file" onChange={sendFile} accept={acceptOptions.join()} id="file-upload" className={s.upload} />
                {addImageLoading && <div className={s.loading} >Loading...</div>}
                {avatar || imageUrl ? <img className={s.newImage} alt="addItem" src={avatar || imageUrl} /> : ""}
            </label>
        </div>
    );
};
