"use client";

import { useState } from "react";
import { Search, Download, Eye, Printer, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArchiveItem {
  id: number;
  title: string;
  hindiTitle: string;
  category: "Essays" | "Articles" | "Criticism" | "Interviews" | "Research Papers";
  year: string;
  snippet: string;
  content: string; // Faux full content
  citation: string;
  tags: string[];
}

const archiveItems: ArchiveItem[] = [
  {
    id: 1,
    title: "Representation of Nature in Jharkhand's Tribal Literature",
    hindiTitle: "झारखंड के आदिवासी साहित्य में प्रकृति का चित्रण",
    category: "Research Papers",
    year: "2016",
    snippet: "An analytical study investigating how oral traditions and modern tribal poetry in regional dialects structure human relationship with forests and water.",
    content: "आदिवासी साहित्य मूलतः जीवन-आकांक्षाओं का दस्तावेज़ है। झारखंड की भौगोलिक स्थिति और यहाँ के लोकजीवन में जो प्रकृति-साहचर्य है, वह यहाँ के गीतों और कविताओं में मुखरित हुआ है। इस शोध-पत्र में हमने यह दर्शाने का प्रयास किया है कि किस प्रकार आदिवासी कविता में 'प्रकृति' कोई अमूर्त वस्तु नहीं है, बल्कि वह परिवार की एक जीवंत इकाई है। आधुनिक काल में जल, जंगल और ज़मीन पर हो रहे पूंजीवादी अतिक्रमण के विरोध में आदिवासी कवियों ने जो प्रतिरोध दर्ज किया है, वह वैश्विक स्तर पर चल रहे पारिस्थितिक (Ecological) आंदोलनों को एक नई अंतर्दृष्टि प्रदान करता है।",
    citation: "Journal of East Indian Indology, Vol 12, Issue 4, pp. 45-58, Ranchi University Press, 2016.",
    tags: ["Tribal Studies", "Ecocriticism", "Jharkhand Folklore"],
  },
  {
    id: 2,
    title: "Satyajit Ray's Cinema and Indian Realism",
    hindiTitle: "सत्यजीत राय का सिनेमा और भारतीय यथार्थवाद",
    category: "Criticism",
    year: "2008",
    snippet: "A critical review of the aesthetic framework of Ray's Apu Trilogy and its impact on the development of Indian Parallel Cinema.",
    content: "सत्यजीत राय का सिनेमा केवल कैमरे की कला नहीं है, बल्कि वह भारतीय समाज के उस संक्रमण काल का दस्तावेज़ है जहाँ परंपरा और आधुनिकता आपस में टकरा रहे थे। अपू त्रयी में जो गरीबी और जीवन-संघर्ष है, वह भावुकतावादी नहीं है; राय वहाँ एक समाजशास्त्रीय तटस्थता के साथ समाज को देखते हैं। राय का यथार्थवाद पश्चिमी नव-यथार्थवाद (Neorealism) से प्रभावित होते हुए भी अपनी भारतीयता में रंगा हुआ है। इस लेख में हमने राय के सिनेमाई व्याकरण—विशेषकर प्रकाश-संयोजन (Lighting) और संगीत के संयमित उपयोग—के माध्यम से उनके सामाजिक चिंतन का विश्लेषण किया है।",
    citation: "Cinema & Culture Quarterly, Vol 8, pp. 102-115, 2008.",
    tags: ["Cinema Critique", "Satyajit Ray", "Social Realism"],
  },
  {
    id: 3,
    title: "Re-evaluation of Nirala's Ram Ki Shakti Pooja",
    hindiTitle: "निराला की 'राम की शक्ति पूजा' का पुनर्मूल्यांकन",
    category: "Essays",
    year: "1995",
    snippet: "Exploring the existential struggles and nationalistic metaphors embedded in Suryakant Tripathi Nirala's classical masterpiece.",
    content: "सूर्यकांत त्रिपाठी 'निराला' रचित 'राम की शक्ति पूजा' केवल राम-रावण युद्ध का पौराणिक आख्यान नहीं है, बल्कि वह आधुनिक मनुष्य के गहरे अस्तित्ववादी संकट (Existential Crisis) की कविता है। जहाँ 'स्थिर राघवेंद्र को हिला रहा फिर-फिर संशय', वह संशय निराला का अपना संशय है और उस पराधीन भारत का संशय है जो साम्राज्यवादी ताकतों के समक्ष स्वयं को कमतर पा रहा था। शक्ति की मौलिक कल्पना करने का अर्थ है—संसाधनों और चेतना का राष्ट्रीयकरण। इस निबंध में हमने निराला की भाषा के तत्सम प्रधान ढाँचे और उसमें निहित महाकाव्यात्मक उदात्तता का सूक्ष्म विश्लेषण किया है।",
    citation: "Hindi Alochana Sandarbha, Rajkamal Publication, 1995.",
    tags: ["Nirala", "Modern Poetry", "Existential Critique"],
  },
  {
    id: 4,
    title: "Preservation of Regional Dialects: Data and Critique",
    hindiTitle: "लोक भाषाओं के संरक्षण की चिंता: आँकड़े और चिंतन",
    category: "Articles",
    year: "2012",
    snippet: "A sociological overview of how minor languages are disappearing in the age of global digitization and urban migration.",
    content: "एक भाषा का मरना केवल शब्दों के कोश का मरना नहीं है, बल्कि उसके साथ जीने वाली एक पूरी संस्कृति, ज्ञान-परंपरा और पर्यावरण-बोध का समाप्त हो जाना है। यूनेस्को की रिपोर्ट के अनुसार भारत की सैकड़ों बोलियाँ लुप्तप्राय हैं। डिजिटल युग में हिंदी के मानकीकरण ने जहाँ एक ओर इसे राष्ट्रीय संपर्क भाषा बनाया, वहीं क्षेत्रीय बोलियों (जैसे नागपुरी, खोरठा, मुंडारी) को हाशिये पर ढकेल दिया। इस लेख में हमने आँकड़ों के साथ यह प्रस्तावित किया है कि प्राथमिक शिक्षा में मातृभाषा को अनिवार्य रूप से शामिल किए बिना लोक भाषाओं को नहीं बचाया जा सकता।",
    citation: "Prabhat Khabar Academic Special, August 2012.",
    tags: ["Sociolinguistics", "Language Preservation", "Education Policy"],
  },
  {
    id: 5,
    title: "Literature and Mass Communication: Special Interview",
    hindiTitle: "साहित्य और जनसंचार: डॉ. अरुण कुमार से विशेष साक्षात्कार",
    category: "Interviews",
    year: "2017",
    snippet: "An insightful dialog discussing how media changes have transformed the reading habits and publishing standards of Hindi critique.",
    content: "साक्षात्कारकर्ता: डॉ. कुमार, आज के इस सोशल मीडिया के दौर में जब हर कोई लेखक है, आलोचना का क्या भविष्य है?\n\nडॉ. अरुण कुमार: देखिए, तकनीक ने अभिव्यक्ति का लोकतंत्रीकरण अवश्य किया है, लेकिन इसके साथ ही इसने 'गहन चिंतन' (Deep Reading) को समाप्त कर दिया है। आज पाठक त्वरित प्रतिक्रिया चाहता है। आलोचना कोई तात्कालिक प्रतिक्रिया नहीं है; यह एक धैर्यवान अनुसंधान है। साहित्य में आज जो सतहीपन आ रहा है, उसका मुख्य कारण यह है कि लेखक लोक-संस्कृति से कटकर केवल डिजिटल स्पेस में जी रहा है। जब तक हिंदी आलोचना स्वयं को इस नए संचार माध्यम के अनुकूल नहीं करेगी, वह नए पाठकों से संपर्क खो देगी।",
    citation: "Ranchi University Academic Bulletin, Vol 19, 2017.",
    tags: ["Digital Media", "Literary Future", "Cultural Dialogue"],
  },
  {
    id: 6,
    title: "New Story Movement and Social Commitment",
    hindiTitle: "नई कहानी आंदोलन और सामाजिक प्रतिबद्धता",
    category: "Research Papers",
    year: "2001",
    snippet: "Exploring the post-independence shift in short stories, looking at Mohan Rakesh, Kamleshwar, and Rajendra Yadav's contributions.",
    content: "1950 के दशक के बाद का भारत आज़ादी के मोहभंग का भारत था। 'नई कहानी' आंदोलन इसी यथार्थ की कोख से पैदा हुआ। मोहन राकेश, कमलेश्वर और राजेंद्र यादव ने मिलकर जिस कहानी आंदोलन को चलाया, उसने प्रेमचंद के आदर्शोन्मुख यथार्थवाद से अलग होकर, टूटते शहरी परिवारों और कुंठित होते जा रहे व्यक्तिगत संबंधों को अपनी कहानियों का आधार बनाया। इस शोध-पत्र में हमने यह सिद्ध किया है कि तमाम व्यक्तिगत कुंठाओं के बावजूद, नई कहानी अपने सामाजिक दायित्वों से विमुख नहीं हुई थी, वरन उसने मध्यवर्गीय समाज की विसंगतियों को नग्न रूप में पेश कर समाज को आईना दिखाया।",
    citation: "National Seminar Proceedings, Patna University Press, 2001.",
    tags: ["Nayi Kahani", "Post-Independence Prose", "Modernism"],
  },
];

export default function Writings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);

  const categories = ["All", "Research Papers", "Criticism", "Essays", "Articles", "Interviews"];

  const filteredItems = archiveItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiTitle.includes(searchQuery) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="writings" className="py-24 px-6 md:px-12 bg-[#FAF6F0] relative overflow-hidden border-b border-gold/15">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/3 rounded-tr-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Digital Literary Repository
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Research & Writings Archive
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-12 bg-[#FDFBF7] p-5 rounded-sm border border-gold/15 shadow-sm">
          {/* Category Selector Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gold text-white font-semibold shadow-sm"
                    : "text-charcoal/70 hover:text-charcoal bg-transparent hover:bg-gold/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
            <input
              type="text"
              placeholder="Search papers, tags, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gold/30 rounded-sm bg-ivory text-xs text-charcoal focus:outline-none focus:border-gold placeholder:text-charcoal/40 transition-colors"
            />
          </div>
        </div>

        {/* Digital Archive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#FDFBF7] border border-gold/15 p-6 rounded-sm shadow-sm hover:shadow-md hover:border-gold/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Metadata */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-bold bg-[#FAF6F0] border border-gold/25 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] text-charcoal/50 font-sans">
                    <Calendar size={11} className="text-gold/60" />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Essay Titles */}
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2 leading-tight">
                  {item.hindiTitle}
                </h3>
                <h4 className="font-sans text-[11px] font-semibold text-charcoal/50 mb-3 italic">
                  {item.title}
                </h4>

                {/* Brief description snippet */}
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed mb-4">
                  {item.snippet}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gold/10 pt-4 mt-2">
                {/* Tags block */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-sans text-charcoal/50 bg-[#FAF6F0] px-2 py-0.5 rounded-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="text-gold hover:text-gold-hover font-semibold uppercase tracking-widest inline-flex items-center space-x-1 transition-colors"
                  >
                    <Eye size={12} />
                    <span>Read Text</span>
                  </button>

                  <span className="text-[10px] text-charcoal/40 font-mono">
                    ID: AR-0{item.id}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Reading Panel overlay */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveItem(null)}
                className="absolute inset-0 bg-black"
              />

              {/* Reader Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-3xl max-h-[85vh] bg-[#FDFBF7] border-2 border-gold/30 rounded-sm shadow-2xl p-6 md:p-10 overflow-y-auto flex flex-col custom-scrollbar text-charcoal"
              >
                {/* Vintage inner border */}
                <div className="absolute inset-2 border border-gold/10 pointer-events-none" />

                {/* Top Reader Controls */}
                <div className="flex justify-between items-center border-b border-gold/15 pb-4 mb-6 z-10 relative">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => window.print()}
                      className="text-charcoal/60 hover:text-gold transition-colors flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold"
                    >
                      <Printer size={13} />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                    <button
                      onClick={() => alert("PDF download started (Simulation)")}
                      className="text-charcoal/60 hover:text-gold transition-colors flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold"
                    >
                      <Download size={13} />
                      <span className="hidden sm:inline">PDF</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="text-charcoal/60 hover:text-charcoal font-bold text-xs uppercase tracking-widest border border-gold/25 px-2.5 py-1 rounded-sm hover:border-gold transition-all duration-300"
                  >
                    Close Reader
                  </button>
                </div>

                {/* Journal Typography layout */}
                <article className="space-y-6 px-1 md:px-4 z-10 relative">
                  {/* Journal Header */}
                  <div className="text-center space-y-2 border-b-2 border-gold/10 pb-4 mb-8">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-bold">
                      Dr. Arun Kumar Legacy Archive • {activeItem.category}
                    </span>
                    <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-charcoal">
                      {activeItem.hindiTitle}
                    </h1>
                    <h2 className="font-sans text-xs italic text-charcoal/50 max-w-xl mx-auto">
                      {activeItem.title}
                    </h2>
                  </div>

                  {/* Scholarly Citation Box */}
                  <div className="bg-[#FAF6F0] p-4 rounded-sm border border-gold/15 font-sans text-[11px] text-charcoal/70 leading-relaxed mb-6">
                    <strong>Cite this work:</strong> {activeItem.citation}
                  </div>

                  {/* Body Text */}
                  <div className="font-serif text-base md:text-lg text-charcoal/90 leading-relaxed text-justify space-y-6 font-light">
                    {/* Drop Cap styling */}
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-gold first-letter:float-left first-letter:mr-2.5 first-letter:mt-1">
                      {activeItem.content}
                    </p>
                    <p>
                      विषय के गहन अध्ययन से स्पष्ट होता है कि आलोचना केवल कृति की समीक्षा नहीं है, बल्कि वह उन सामाजिक-आर्थिक और सांस्कृतिक परिस्थितियों की पड़ताल भी है, जिनमें उस साहित्य का सृजन हुआ। आज के उत्तर-आधुनिक युग में जब साहित्यिक प्रणालियाँ तेज़ी से बदल रही हैं, यह अत्यंत आवश्यक है कि हम अपने लोक-तत्वों और शास्त्र के अंतर्संबंधों को नए सिरे से परिभाषित करें।
                    </p>
                    <p>
                      यह शोध प्रलेख डॉ. अरुण कुमार के रांची विश्वविद्यालय में दिए गए व्याख्यानों और शोध-पत्रिकाओं में प्रकाशित लेखों के संयुक्त अध्ययन से संकलित है।
                    </p>
                  </div>

                  {/* Signoff Monogram */}
                  <div className="flex justify-center pt-12 border-t border-gold/15">
                    <span className="font-serif text-2xl font-bold tracking-widest text-gold/40 border border-gold/15 px-3 py-1 rounded-sm">
                      AK
                    </span>
                  </div>
                </article>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
