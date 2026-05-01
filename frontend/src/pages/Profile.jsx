import React from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import userLogo from "../assets/user.jpg"
import { Link, useSearchParams } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSelector } from 'react-redux'
const Profile = () => {
    const {user} = useSelector(store => store.auth)
    return (
        <div className='pt-20 md:ml-[320px] md:h-screen'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
                    {/* image section */}
                    <div className='flex flex-col items-center justify-center md:w-[400px]'>
                        <Avatar className='w-40 h-40 border-2'>
                            <AvatarImage src={userLogo} />
                        </Avatar>
                        <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3'>Mern Stack Developer</h1>
                        <div className='flex gap-4 items-center'>
                            <Link><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                        </div>
                    </div>
                    {/* info section */}
                    <div>
                        <h1 className="font-bold text-center md:text-start text-4xl mb-7">Welcome {user.firstName || "User"} !</h1>
                        <p><span className='font-semibold'>Email :</span>dishagupta@gmail.com</p>
                        <div className='flex flex-col gap-2 items-start justify-start my-5'>
                            <Label>About me</Label>
                            <p className='border dark:border-gray-600 p-6 rounded-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iusto nisi repellat aliquam modi ducimus iste voluptatem! Tenetur repellat veniam molestiae accusamus vitae voluptate officia? Commodi officiis labore fuga sunt assumenda perferendis optio eum!</p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button >Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Edit profile</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Make changes to your profile here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className='flex gap-2'>
                                        <div >
                                            <Label htmlFor="name" className="text-right mb-2">
                                                First Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="firstName"
                                                placeholder="First Name"
                                                type="text"
                                                className='col-span-3 text-gray-500'
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="username"
                                                className="text-right mb-2"
                                            >
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastname"
                                                name="lastName"
                                                placeholder="Last Name"
                                                type="text"
                                                className='col-span-3 text-gray-500'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div >
                                            <Label htmlFor="facebook" className="text-right mb-2">
                                                Facebook
                                            </Label>
                                            <Input
                                                id="facebook"
                                                name="Facebook"
                                                placeholder="Enter a URL"
                                                type="text"
                                                className='col-span-3 text-gray-500'
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="Instagram"
                                                className="text-right mb-2"
                                            >
                                                Instagram
                                            </Label>
                                            <Input
                                                id="instagram"
                                                name="instagram"
                                                placeholder="Enter a URL"
                                                type="text"
                                                className='col-span-3 text-gray-500'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div >
                                            <Label htmlFor="linkedin" className="text-right mb-2">
                                                Linkedin
                                            </Label>
                                            <Input
                                                id="linkedin"
                                                name="linkedin"
                                                placeholder="Enter a URL"
                                                type="text"
                                                className='col-span-3 text-gray-500'
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="github"
                                                className="text-right mb-2"
                                            >
                                                Github
                                            </Label>
                                            <Input
                                                id="github"
                                                name="github"
                                                placeholder="Enter a URL"
                                                type="text"
                                                className='col-span-3 text-gray-500'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className='text-right mb-2'>Description</Label>
                                        <Textarea
                                            id="bio"
                                            name="bio"
                                            placeholder="Enter a description"
                                            className="col-span-3 text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <Label className='text-right mb-2'>Picture</Label>
                                        <Input
                                            id="file"
                                            type="file"
                                            accept="image/*"
                                            className="w-[277px]"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Profile
