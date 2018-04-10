import React, { Component } from 'react';
import { WebView } from 'react-native';

const EverFi =  () => {
  return (
          <WebView
             source={{ uri: 'https://demo.everfi-next.net/student/dashboard/default-program/calculators ' }}
             style={{marginTop: 20}}
          />
        );}

export default {
  component: EverFi
}

const styles = StyleSheet.create({
   container: {
      height: 350,
   }
})
