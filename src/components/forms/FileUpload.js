import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const fileModifier = (e) => {
        //console.log(e.target.files);
        let files = e.target.files;
        let UploadedImagesFile = values.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        //console.log(uri);
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                            headers: {
                                authtoken: user ? user.token : "",
                            },
                        })
                            .then(res => {
                                console.log("Images has been uploaded res data", res);
                                setLoading(false);
                                UploadedImagesFile.push(res.data);
                                setValues({ ...values, images: UploadedImagesFile });
                            })
                            .catch(err => {
                                setLoading(false)
                                console.log("cloudinary not able to upload");
                            })
                    },
                    'base64'
                );
            }
        }
    };

    const handleRemoveImage = (public_id) => {

        setLoading(true)
        console.log("remove images", public_id);
        //backend to remove images
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user ? user.token : "",
            },
        }
        )
            .then((res) => {
                setLoading(false)
                const { images } = values
                let filterImages = images.filter((item) => {
                    //filter the item that does not match with id
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filterImages })
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };


    return (
        <>
            <div className="row">
                {values.images && values.images.map((image) => (

                    <Badge
                        count="X"
                        key={image.public_id}
                        onClick={() => handleRemoveImage(image.public_id)}
                        style={{ cursor: "pointer" }}
                    >
                        <Avatar
                            src={image.url}
                            shape="square"
                            size={100}
                            className="ml-3"
                        />
                    </Badge>
                ))}

            </div>
            <div className="row">

                <label className=" btn btn-raised btn-secondary mt-3">Choose File
                  <input
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={fileModifier}
                    />
                </label>
            </div>
        </>
    );
};

export default FileUpload