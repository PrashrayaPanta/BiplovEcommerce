
import React, { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Expand } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ProductGallery({ images = ["/placeholder.svg"], discount = 33, className }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const carouselRef = useRef(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const { left, top, width, height } = e.target.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      setMousePosition({ x, y })
    }
  }

  return (
    <div className={cn("relative flex flex-col md:flex-row gap-4 mb-6", className)}>
      {/* Main Carousel */}
      <div className="relative flex-1 order-1 md:order-2">
        {discount && (
          <Badge 
            variant="destructive" 
            className="absolute top-4 left-4 z-10 bg-[#3c07ff]"
          >
            -{discount}%
          </Badge>
        )}
        <Carousel
          ref={carouselRef}
          className="w-full"
          opts={{ startIndex: selectedIndex, loop: true}}
          onSelect={(carousel) => setSelectedIndex(carousel.selectedScrollSnap())}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <Card 
                  className="relative max-h-[460px] aspect-square border-0 overflow-hidden"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className={cn(
                      "w-full h-full object-cover rounded-lg transition-transform duration-200",
                      isZoomed && "scale-175"
                    )}
                    style={isZoomed ? {
                      transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
                    } : {}}
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
            >
              <Expand className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <img
              src={images[selectedIndex]}
              alt={`Expanded view of product`}
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnails */}
      <ScrollArea className="order-2 md:order-1 w-full md:w-24 h-24 md:h-[460px]">
        <div className="flex md:flex-col gap-2 p-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2",
                selectedIndex === index 
                  ? "border-primary" 
                  : "border-transparent hover:border-primary/50"
              )}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}