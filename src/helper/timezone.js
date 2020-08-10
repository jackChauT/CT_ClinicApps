import { fixTimezoneCalc } from '../config/config'
import { AsyncStorage } from '@react-native-community/async-storage';

export async function setOffset(offset) {
    await AsyncStorage.setItem('offset', offset)
}

export function translateToLocalTime (time, offset) {
    return new Date( time - offset * fixTimezoneCalc );
}