import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const ListContext = React.createContext({})

function ListContextProvider(props) {

    const [listLoading, setListLoading] = useState(false)
    const [list, setList] = useState([])
    const {username} = useContext(AuthContext)

    const getListItems = async () => {
        try {
            setListLoading(true)
            let res = await axios({
                url: '/list',
                method: 'get',
                params: {
                    username: username,
                },
            })

            let result = await res.data

            if (result && result.success) {
                setList([...result.data])
                setListLoading(false)
            } else {
                setListLoading(false)
            }
        } catch (err) {
            setListLoading(false)
        }
    }

    const isItemInList = id => {
        return list.some(item => item.listID === id)
    }

    const addToList = async listItem => {
        let {
            id,
            name,
            sourceUrl,
            thumbnailUrl,
            datePublished,
            owningOrgId,
        } = listItem

        try {
            let res = await axios({
                url: '/list',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    username,
                    listID: id,
                    name,
                    sourceUrl,
                    thumbnailUrl,
                    datePublished,
                    owningOrgId,
                }),
            })

            let result = await res.data

            if (result && result.success) {
                if (isItemInList(id)) {
                    setListLoading(false)
                    return
                } else {
                    setListLoading(false)
                    setList([...list, result])
                }
            } else {
                setListLoading(false)
            }
        } catch (err) {
            setListLoading(false)
        }
    }

    const deleteListItem = async id => {
        try {
            let res = await axios({
                url: '/list',
                method: 'delete',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    username,
                    listID: id,
                },
            })

            let result = await res.data

            if (result && result.success) {
                setListLoading(false)
                setList(list => list.filter(item => item.listID !== id))
            } else {
                setListLoading(false)
            }
        } catch (err) {
            setListLoading(false)
        }
    }

    const listContextValue = {
        listLoading,
        getListItems,
        list,
        isItemInList,
        addToList,
        deleteListItem,
    }

    return (
        <ListContext.Provider value={listContextValue}>
            {props.children}
        </ListContext.Provider>
    )
}

export { ListContextProvider, ListContext }