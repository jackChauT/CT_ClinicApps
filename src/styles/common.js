import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginHorizontal: 16,
      },
      input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 10,
        borderRadius: 10,
      },
      inputError: {
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'red',
          marginBottom: 10,
          borderRadius: 10,
        },
      textError: {
          fontSize: 8,
          color:'red'
      },
});
