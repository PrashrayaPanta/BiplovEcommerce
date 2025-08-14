import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TinyMCEEditor from "@/components/blogComponents/TinyMCEEditor";

export const BlogWritingPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, category, tags, content });
    // Here you would typically send this data to your backend
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Write a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog post title"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div>
              <Label>Content</Label>
              <TinyMCEEditor
                content={content}
                onEditorChange={(newContent) => setContent(newContent)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleSubmit}>Publish</Button>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            Category: {category} | Tags: {tags}
          </div>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};


