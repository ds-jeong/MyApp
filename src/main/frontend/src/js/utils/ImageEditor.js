import React, { useState, useEffect } from 'react';

const ImageEditor = ({ initialImage }) => {
    const [image, setImage] = useState(initialImage);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        // 초기 이미지가 변경될 때마다 상태를 업데이트
        setImage(initialImage);
    }, [initialImage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            {newImage ? (
                <div>
                    <h3>미리보기 새 이미지:</h3>
                    <img
                        src={newImage}
                        alt="미리보기 새 이미지"
                        style={{ maxWidth: '500px', maxHeight: '500px' }}
                    />
                </div>
            ) : (
                <div>
                    <h3>현재 이미지:</h3>
                    <img
                        src={image}
                        alt="현재 이미지"
                        style={{ maxWidth: '500px', maxHeight: '500px' }}
                    />
                </div>
            )}
            <div>
                <h3>새 이미지 업로드:</h3>
                <input
                    name="file"
                    className="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};

export default ImageEditor;