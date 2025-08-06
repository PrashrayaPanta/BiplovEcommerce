import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StarIcon } from 'lucide-react'

const fakeReviews = [
  { id: 1, name: 'Alice Johnson', avatar: 'AJ', rating: 5, comment: 'Excellent product! Exceeded my expectations.' },
  { id: 2, name: 'Bob Smith', avatar: 'BS', rating: 4, comment: 'Great value for money. Would recommend.' },
  { id: 3, name: 'Carol White', avatar: 'CW', rating: 3, comment: 'Decent product, but could use some improvements.' },
  { id: 4, name: 'David Brown', avatar: 'DB', rating: 5, comment: 'Absolutely love it! Will definitely buy again.' },
  { id: 5, name: 'Eva Green', avatar: 'EG', rating: 4, comment: 'Very satisfied with my purchase. Fast shipping too!' },
]

function Reviews() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Review</Label>
                <Textarea id="message" placeholder="Write your review here" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit Review</Button>
        </CardFooter>
      </Card>
      
      <div className="grid gap-6 mb-8">
        {fakeReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.avatar}`} />
                  <AvatarFallback>{review.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{review.name}</CardTitle>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default Reviews

