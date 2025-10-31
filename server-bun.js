import {serve} from 'bun';

serve({
    fetch(request){
        const url = new URL(request.url)
        if (url.pathname === '/'){
            return new Response('Hello Me',{status:200})
        }else if(url.pathname === '/about'){
            return new Response('This is the about page',{status:200})
        }else{
            return new Response('404 page not found',{status:404})
        }
    },
    port:3000,
    hostname: "127.0.0.1"
})