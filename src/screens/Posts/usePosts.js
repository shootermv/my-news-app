
import {useEffect, useReducer} from "react"
const key = process.env.API_KEY;

const reducer = (prevState, action) => {
    switch (action.type) {
      case 'FETCH_STARTED':
        return {
          data: [],
          error: null,
          isFetching: true,
        };
      case 'FETCH_SUCCESS':
        return {
          error: null,
          data: action.data,
          isFetching: false,
        };
      case 'FETCH_ERROR':
        return {
          data: [],
          isFetching: false,
          error: null,
        };
    }
  }


export const usePostsData = (category) => {
    const getData = async () => {
        try {
            dispatch({type: 'FETCH_STARTED'})
            const url = `http://api.mediastack.com/v1/news?access_key=${key}&categories=${category}&languages=en`
            const res = await fetch(url)
            if (!res.ok) throw Error(res.errors || 'Error')
            const {data} = await res.json()
            dispatch({type: 'FETCH_SUCCESS', data})
        } catch(error) {
            dispatch({type: 'FETCH_ERROR', error})
        }
    }
    const [ {isFetching, error, data}, dispatch] = useReducer(reducer, {
        isFetching: false,
        error: null,
        data: [],
    })
    useEffect(() => {
        getData()
    }, [])
    return {isFetching, error, data}
}