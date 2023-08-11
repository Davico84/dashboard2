import axios from 'axios';
import mime from 'mime';

export const uploadImageAsync = async (uri) => {
  const formData = new FormData();
  const fileType = mime.getType(uri);
  formData.append('file', {
    uri: uri,
    type: fileType,
    name: 'upload.jpg',
  });

  console.log(formData)
  formData.append('upload_preset', 'gameShop_img');
  formData.append('cloud_name', 'deamondhero');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/deamondhero/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const result = response.data;
    console.log(result);
    console.log(result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to upload image');
  }
};




// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';


//  export const uploadImageAsync = async (uri) => {
//     const body = new FormData();
//     body.append("file", {
//       uri: uri,
//       type: "image/jpeg",
//       name: "upload.jpg",
//     });
//     body.append("upload_preset", "gameShop_img");
//     body.append("cloud_name", "deamondhero");

//     const response = await fetch("https://api.cloudinary.com/v1_1/deamondhero/upload", {
//       method: "POST",
//       body: body,
//     });

//     const result = await response.json();
//     console.log(result)
//     console.log(result.secure_url)
//     return result.secure_url;
//   };
  
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsMultipleSelection: true,
  //     allowsEditing: false,
  //     aspect: [3, 4],
  //     quality: 0.5,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     const uploadedImages = await Promise.all(result.assets.map(async (image) => {
  //       const imageUrl = await uploadImageAsync(image.uri);
  //       return { ...image, imageUrl };
  //     }));

   
  
  //     setImage(uploadedImages);
  //     console.log(uploadedImages)
  //     return uploadedImages
  //   }}


  // return (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Button title="Load images from gallery" onPress={pickImage} />
      
  //     {image && image.map((i)=>{
  //       return(
  //     <Image source={{ uri: i.uri }} style={{ margin:5,  width: 200, height: 200}} />)})
  //   }
  //   </View>
  // );
// }