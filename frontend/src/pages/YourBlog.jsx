import React, { useEffect } from 'react'  // ✅ Fix 3: added useEffect
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import { Edit, Trash2 } from 'lucide-react'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'

const YourBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog } = useSelector(store => store.blog)

  useEffect(() => {
    const getOwnBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/blog/get-own-blogs`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getOwnBlog()
  }, [])

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`, { withCredentials: true })
      //withCredentials:true sends your login cookie automatically Cookies sent(yes) Auth headers?(yes) Use case Protected/private routes
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id)
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt)
    const formattedDate = date.toLocaleDateString("en-GB")
    return formattedDate
  }

  return (
    <div className='pb-10 pt-20 md:ml-[320px] h-screen'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blog && blog.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">
                    <img src={item.thumbnail} className="w-20 rounded-md hidden md:block" alt="" />
                    <h1 className="hover:underline cursor-pointer">{item.title}</h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(index)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>                    <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}><Edit />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteBlog(item._id)}><Trash2 className="text-red-500" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default YourBlog