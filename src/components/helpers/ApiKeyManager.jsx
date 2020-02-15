import React, {useState, useEffect, useContext, createContext} from "react"
import {useAuth0} from "../auth/Auth"

export const ApiKeyContext = createContext();

export const useApiKeyManager = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({children}) => {
    const {loading, user, managementRequest} = useAuth0();
    const [apiKeys, setApiKeys] = useState({});
    const [remoteApiKeysChanged, setRemoteApiKeysChanged] = useState(true);
    const [localApiKeysChanged, setLocalApiKeysChanged] = useState(false);

    useEffect(() => {  // Fetch remote API Keys
        if (!loading && user && remoteApiKeysChanged) {
            managementRequest({
                endpoint: `users/${user.sub}`,
                method: "GET"
            }).then((data) => {
                let keys = data.user_metadata["apiKeys"];
                setApiKeys(keys);
                setRemoteApiKeysChanged(false);
                return keys
            });
        }
    }, [remoteApiKeysChanged, loading, user, managementRequest]);

    useEffect(() => {  // Update remote API Keys
        if (!loading && user && localApiKeysChanged) {
            managementRequest({
                endpoint: `users/${user.sub}`,
                method: "PATCH",
                data: {"user_metadata": {"apiKeys": apiKeys}}
            }).then((response) => {
                setLocalApiKeysChanged(false);
                setRemoteApiKeysChanged(true);
                console.log("Updating remote");
            });
        }
    }, [localApiKeysChanged, apiKeys, loading, user, managementRequest]);

    const deleteApiKey = (name) => {
        setApiKeys(
            Object.keys(apiKeys).filter(key => key !== name).reduce((obj, key) => {
                obj[key] = apiKeys[key];
                return obj;
            }, {})
        );
        setLocalApiKeysChanged(true);
    };

    const updateApiKey = (name, apiKey, newName) => {
        newName = newName || name;
        if (newName !== name) deleteApiKey(name);
        setApiKeys({...apiKeys, [name]: apiKey});
        setLocalApiKeysChanged(true);
    };

    // const startEdit = (name) => {
    // };
    // const cancelEdit = (name) => {
    // };
    // const confirmEdit = (name, apiKey, newName) => {
    // };

    return (
        <ApiKeyContext.Provider
            value={{
                apiKeys,
                localApiKeysChanged,
                deleteApiKey,
                updateApiKey,
                // startEdit,
                // cancelEdit,
                // confirmEdit,
            }}
        >
            {children}
        </ApiKeyContext.Provider>
    );
};