import AsyncStorage from '@react-native-async-storage/async-storage'

const useStorage = () => {
    // Search saved items
    const getItem = async (key) => {
      try {
        const passwords = await AsyncStorage.getItem(key);
        return JSON.parse(passwords) || [];

      } catch(error) {
        console.log('ERROR when searching ', error)
        return [];
      } 
    }

    // Save item to storage
    const saveItem = async (key, value) => {
        try {
            let passwords = await getItem(key);

            passwords.push(value)

            await AsyncStorage.setItem(key, JSON.stringify(passwords))

        }catch(error){
            console.log('Error when save ', error)
        }
    }

    // Remove item from storage
    const removeItem = async(key, item) => {
        try{
            let passwords = await getItem(key);

            let myPasswords = passwords.filter((password) => {
                return (password !== item)
            })

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords))
            return myPasswords;

        }catch(error){
            console.log('Error when delete ', error)

        }
    }

    return {
        getItem,
        saveItem,
        removeItem
    }
}

export default useStorage;