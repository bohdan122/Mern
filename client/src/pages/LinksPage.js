import React, {useState, useCallback, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkList} from '../components/LinkList'

export const LinksPage = () =>{
    const [links,setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const fetchLinks = useCallback(async () =>{
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        }
        
        catch (e) { 
             console.log('Oops view your code') 
            }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader/>
    }

    return(
        <>
        {!loading && <LinkList links={links}/>}
        </>
    )
}