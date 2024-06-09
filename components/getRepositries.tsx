'use server'
import axios from 'axios'
import React from 'react'

type Props = {}

const GetRepositries = async ({
    repo
}: {
    repo: string | undefined 
}) => {
    if(!repo){
        return <div>loading...</div>
    }
    const repodetail = await axios.get(`https://github.com/orgs/webpack/repositories`).then(res => res.data)
    console.log(repodetail); 

  return (
    <div>

    </div>
  )

}

export default GetRepositries