import React, { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { baseUrl } from "../../../api/authService/authService";
import { useAppSelector } from "../../../core/redux/redux";
import { imagesApiService } from "../../../api/images/imagesApiService";

import "./AddImage.scss";

interface IAddTeamImage {
    imageUrl: string;
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
}

export const AddImage:FC<IAddTeamImage> = ({ imageUrl, avatar, setAvatar }) => {
    const newImage = avatar ? baseUrl + avatar : "";
    const { token } = useAppSelector(state => state.authorizationReducer);
    
    const [setImageToServer, {data: imageData, error: imageError}] = imagesApiService.useSetImageToServerMutation();

    const sendFile = useCallback( async (event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : "";
        try {
            const data = new FormData();
            data.append("file", file);
            console.log(data);

            await setImageToServer({token, data}).unwrap();

        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (imageData && !imageError) {
            setAvatar(imageData);
        }
    }, [imageData, imageError]);
    // const sendFile = React.useCallback(async (event: React.ChangeEvent) => {
    //     const target= event.target as HTMLInputElement;
    //     const file = target.files ? target.files[0] : "";
    //     try {
    //         const data = new FormData();
    //         data.append("file", file);
    //
    //         await axios.post(baseUrl + "/api/Image/SaveImage", data, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })
    //             .then(res => setAvatar(res.data));
    //
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);

    return (
        <div className="AddImage">
            <div className="AddImage__image-wrapper" >
                <label className="custom-file-upload" htmlFor="file-upload" />
                <input type="file" onChange={sendFile} id="file-upload" className="upload" />

                {newImage || imageUrl ? <img className="new-image" alt="addItem" src={newImage || imageUrl} /> : ""}
            </div>
        </div>
    );
};
