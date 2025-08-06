import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function FAQSection() {
  return (
    <div className="container mx-auto px-8 py-12 max-w-6xl bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Heading and Text */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3c07ff] mb-8 mt-2">
            Have a question? Get in touch
          </h1>
          <p className="text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Right Column - FAQ Accordion */}
        <div className="bg-gray-50 rounded-lg px-12 py-6">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="flex justify-between py-4 text-left font-medium">
                What is an Audiophile? Do i need to be oaudiophile to get an IEM?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                An audiophile is someone who is enthusiastic about high-fidelity sound reproduction. No, you don't need
                to be an audiophile to get an IEM (In-Ear Monitor). IEMs are for anyone who wants better sound quality
                than typical earbuds provide.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="flex justify-between py-4 text-left font-medium">
                What is an Audiophile? Do i need to be oaudiophile to get an IEM?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                An audiophile is someone who is enthusiastic about high-fidelity sound reproduction. No, you don't need
                to be an audiophile to get an IEM (In-Ear Monitor). IEMs are for anyone who wants better sound quality
                than typical earbuds provide.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="flex justify-between py-4 text-left font-medium">
                What is an Audiophile? Do i need to be oaudiophile to get an IEM?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                An audiophile is someone who is enthusiastic about high-fidelity sound reproduction. No, you don't need
                to be an audiophile to get an IEM (In-Ear Monitor). IEMs are for anyone who wants better sound quality
                than typical earbuds provide.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="flex justify-between py-4 text-left font-medium">
                What is an Audiophile? Do i need to be oaudiophile to get an IEM?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                An audiophile is someone who is enthusiastic about high-fidelity sound reproduction. No, you don't need
                to be an audiophile to get an IEM (In-Ear Monitor). IEMs are for anyone who wants better sound quality
                than typical earbuds provide.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FAQSection

