import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Reload = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  const imageArray = [
'https://thumbs.gfycat.com/BiodegradableFrankChimpanzee-max-1mb.gif'
    // Agrega aquí más URLs de imágenes en el array
  ];

  useEffect(() => {
    // Simulación de tiempo de carga
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * imageArray.length);
      const randomImage = imageArray[randomIndex];
      setSelectedImage(randomImage);
      setLoading(false);
    }, 2000); // Cambia este valor para ajustar el tiempo de carga simulado
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          {/* Agrega aquí un componente de carga o un indicador de carga */}
        </View>
      ) : (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:"center",

    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode:"cover",
  },
});

export default Reload;