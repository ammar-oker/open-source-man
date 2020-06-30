import Posts from "@/components/Posts";
import Post from "@/components/Post";
import AddPost from "@/components/AddPost";
import Profile from "@/components/Profile";

export default [
    {path: '/', component: Posts},
    {path: '/new', component: AddPost},
    {path: '/post/:id', component: Post},
    {path: '/user/:id', component: Profile},
    {path: '/me', component: Profile},
]