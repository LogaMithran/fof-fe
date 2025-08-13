import './App.css'
import MapBoundry from "./Boundry/index.jsx";
import {useContext, useEffect, useState} from "react";
import MapContext from "./Boundry/mapContext.jsx";
import axios from "axios";
import {BACKEND_URL} from "./utils/constants.js";
import {storage} from "./utils/storage.js";
import {Toast} from "./shared/toast.jsx";

function App() {

    const [userName, setUserName] = useState("")
    const [showMaps, setShowMaps] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const {refreshMap, showToast} = useContext(MapContext)
    const [isError, setError] = useState(false)

    useEffect(() => {
        const userName = storage.getFromCookies("userName")
        if (userName) {
            setShowLoader(true)
            setUserName(userName)
            setShowLoader(false)
            setShowMaps(true)
        }
    }, []);
    const handleInputChange = (e) => {
        setUserName(e?.target?.value)
    }
    const handleCreateUser = async () => {
        if (!userName) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
            setShowLoader(false)
            return
        }
        setShowLoader(true)
        const response = axios.post(`${BACKEND_URL}/users`, {name: userName, email: userName}).then((response) => {
            if (response.status === 201) {
                setShowLoader(false)
                setShowMaps(true)
                storage.storeInCookies("userName", userName, 1)
            }
        }).catch((err) => {
            showErr()
        })
    }

    const showErr = () => {
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000)
        setShowLoader(false)
        return
    }

    return (
        <div className="relative min-h-screen bg-gray-50">
            {/* Top Form Section */}
            <div
                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center w-full px-4">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4 border border-gray-200">
                    <input
                        type="email"
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isError ? 'border-red-600' : "border-grey-300"} `}
                    />
                    <div className="flex justify-between space-x-3">
                        <button
                            onClick={handleCreateUser}
                            disabled={showMaps}
                            className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${showMaps ? 'opacity-25' : ''}`}
                        >
                            Submit
                        </button>
                        <button
                            onClick={refreshMap}
                            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
                {showToast && (<Toast msg={"Spotted some users nearby"}/>)}

            </div>

            <div className="pt-50 px-4">
                {/*<div className="flex justify-center items-center">*/}
                {/*    <Friends/>*/}
                {/*</div>*/}
                {showMaps ? (
                    <div className="w-full h-[80vh] overflow-hidden rounded-xl shadow-md border border-gray-300">
                        <MapBoundry userName={userName}/>
                    </div>
                ) : (showLoader ? (
                    <img className="w-10 h-10" src="/assets/loader.gif"/>) : (<></>))}
            </div>
        </div>

    )
}

export default App
