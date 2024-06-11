"use server"


// Define the server action to fetch repositories
export const getRepositories =    async () => {
    const data =  await fetch('https://api.github.com/orgs/PalisadoesFoundation/repos').then(response => response.json())

    return data;
};