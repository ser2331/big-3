import React, {Dispatch, FC, SetStateAction, useCallback, useEffect} from "react";
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
    const [uploadImage, {data: imageData, error: addImageError, isLoading: addImageLoading}] = imagesApiService.useAddImageMutation();

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

        uploadImage(data);
    }, []);

    useEffect(() => {
        if (imageData) {
            setAvatar(baseUrl + imageData);
        }
    }, [imageData]);

    return (
        <div className={s.AddImage}>
            {addImageError && <ErrorMessage message="Не удалось загрузить фото..." />}
            <div className={s.AddImage__imageWrapper} >
                <label className={s.customFileUpload} htmlFor="file-upload" />
                <input type="file" onChange={sendFile} accept={acceptOptions.join()} id="file-upload" className={s.upload} />
                {addImageLoading && <div className={s.loading} >Loading...</div>}
                {avatar || imageUrl ? <img className={s.newImage} alt="addItem" src={avatar || imageUrl} /> : ""}
            </div>
        </div>
    );
};
