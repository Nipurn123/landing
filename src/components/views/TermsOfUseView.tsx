import { m } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { Seo } from '../../seo';

const GREEN = "#4aab6d";
const DARK = "#111827";

const sections = [
  {
    id: "permitted-users",
    title: "Permitted Users",
    content: `You represent and warrant that you have the legal capacity and authority to agree to and accept these Terms of Use on behalf of yourself and any person you purport to represent, being either a company, partnership firm, sole proprietorship or any other organisation, and access the Offerings on its behalf as a result of being duly authorized by way of necessary corporate action, as may be prescribed statutorily and/or under the charter documents of such entity.

You shall not access and/or use the Offerings if you are not competent to contract under the applicable laws, rules and regulations.

Persons below the age of 18 (eighteen) years shall use the Service only under strict guidance and supervision of their parents/guardians.`
  },
  {
    id: "access",
    title: "Access",
    content: `Subject to the terms hereof, 100xprompt grants you permission to use the Offerings as set forth in this Terms of Use, provided that: (i) you will not copy or distribute, any part of the Offerings in any medium or in any manner whatsoever without 100xprompt's explicit authorisation; (ii) you will not alter or modify any part of the Offerings; and (iii) you will comply with these Terms of Use.

In order to access and use the Product, you will need to register on the Platform and create a "User" account. Your account gives you access to the Product and its functionality that we may establish and maintain from time to time and in our sole discretion on the Platform.

You must provide your full legal name, valid email address and any other information requested from you, from time to time, in order to complete the registration process and be entitled to use the Product. The Company is not under any obligation to verify the actual identity or authority of the User.

Upon completing the registration process, you will be provided with a user identification code, password, or any other piece of information, as part of our security procedures. You must treat such information as confidential, and you must not disclose it to any third party. You also agree to ensure that you will exit/log out from your account at the end of each session. You are solely responsible and liable for any use and misuse of your identification and password and for all activities that occur under your login name and password.`
  },
  {
    id: "fees-payment",
    title: "Fees and Payment",
    content: `The Company shall charge you fees for your use of the Product ("Fees"). The Company may, at its discretion, modify the Fees from time to time. In the event the Company increases the Fees, we may give you at least 30 (thirty) days' notice and such increase in the Fees will be applicable on your next renewal.

Subsequent to payment of the Fees, you may choose not use the Offerings. However, even under such circumstances, any and all Fees paid by you to the Company shall be non-refundable.

You agree and understand that you will be redirected to third-party payment gateway websites in order to avail the Product. You agree, understand and confirm that the debit card/credit card/net banking/payment wallet details provided by you will be correct and accurate.`
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    content: `You may cancel your subscription or plan at any time. Upon cancellation:

• You will continue to have access to the Offerings until the end of your current billing period
• No refunds will be provided for any fees already paid or for any unused portion of the billing period
• You will be charged only for the usage and fees that have accrued up to the date of cancellation
• After the end of the billing period, no further charges will be applied unless you re-subscribe
• Cancellation may be completed through your account dashboard or by contacting the Company through the designated support channels`
  },
  {
    id: "ownership",
    title: "Ownership of the Offerings",
    content: `You agree and acknowledge that the Company has the worldwide ownership of the software code, models, training methodology, process flows, products of training, proprietary technology, technical know-how, software tools, controls, designs, algorithms, analyses, class libraries, text, objects, documentation, and anything in relation to the Offerings and all the trademarks, copyright and any other intellectual property rights of any nature in the Offerings.

Subject to these Terms of Use, you may access and/or avail of the Offerings, for your requirements only. You are not entitled to duplicate, distribute, create derivative works of, display, or commercially exploit any intellectual property rights associated with the Offerings features or facilities, directly or indirectly, without our prior written permission.`
  },
  {
    id: "use-of-offerings",
    title: "Use of the Offerings",
    content: `The Offerings are made available to you for your lawful use only. As a condition of your use/access of the Offerings, you represent and warrant to the Company that you will not use/access the Offerings for any purpose that is unlawful, illegal and/or prohibited by these terms, conditions and notices.

Your use of the Offerings must: (i) be in accordance with these Terms of Use; (ii) be lawful and must comply with all applicable domestic and foreign laws, regulations, rules and policies; (iii) be only for purposes that are consistent with the spirit and intended purpose of the Offerings; (iv) not infringe the legal rights of any other person.`
  },
  {
    id: "unauthorised-use",
    title: "Unauthorised Use",
    content: `As a User, you agree not to:

• Access or use the Offerings in a manner that violates any applicable laws, regulations, or third-party rights
• Attempt to gain unauthorized access to other user accounts, systems, or networks associated with the Offerings
• Interfere with or disrupt the normal operation of the Offerings, its servers, or networks
• Engage in any activity that could harm, disable, overburden, or impair the functionality or security of the Offerings
• Modify, reverse engineer, decompile, or disassemble the Offerings or any part thereof
• Create any derivative works based on the Offerings without prior written consent from the Company
• Use the Offerings for any commercial purposes without obtaining explicit permission from the Company
• Upload, input, publish, transmit, store, update or share any information that is defamatory, obscene, pornographic, or otherwise unlawful`
  },
  {
    id: "user-content",
    title: "User Content",
    content: `While using the Product, you may provide various forms of inputs, such as text, image, voice or other form of data input ("Input"). You represent and warrant that you have all necessary rights and authority to provide the Input and that it does not violate the intellectual property rights or other rights of any third party.

Once the Product receives your Inputs, it will generate content, results, or other output, in the form of text, voice etc ("Output"), using certain algorithms and processes.

You agree and acknowledge that the Content shall be owned by you. To the extent possible and permissible by law, the Company hereby assigns to you, the use all intellectual property rights in and associated with the Output.`
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content: `Access to and use of the Offerings is also subject to the Company's privacy policy, available at https://100xprompt.com/privacy ("Privacy Policy"). We respect your privacy.

The Company will not intentionally monitor or disclose any private messages or address information unless required by law, regulation or court order. You agree to respect the privacy and confidentiality of others.`
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: `You agree to indemnify, defend and hold harmless the Company and all other persons related to, associated or connected with the Company, from and against any and all liabilities, losses, damages, costs and expenses, including without limitation, legal fees, incurred by the Company or such other person in connection with any claim, demand or other action arising out of, related to, or connected with your use of the Offerings, or your breach of these Terms of Use.

This indemnification obligation will survive these Terms of Use.`
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: `IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES OR FOR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE ACCESS, USE OR PERFORMANCE OF THE OFFERINGS.

IN ANY CASE, THE USER ACKNOWLEDGES AND AGREES THAT OUR AGGREGATE LIABILITY UNDER THESE TERMS WILL NOT EXCEED THE GREATER OF THE FEES YOU PAID FOR AVAILING THE PRODUCT DURING THE 12 MONTHS IMMEDIATELY PRIOR TO THE DATE THE LIABILITY AROSE.`
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    content: `You agree that you are availing of the features and facilities at your own risk. The Offerings are provided on an "AS IS" basis. The Company expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement.

The Company makes no warranty that the features and facilities shall meet your requirements, that the Offerings shall be uninterrupted and/or timely and/or secure and/or error free.`
  },
  {
    id: "termination",
    title: "Termination",
    content: `The Company may, at any time, in its sole discretion, cease to provide the Offerings to any User.

The Company may, in its sole discretion: (i) without cause, suspend or terminate your Account and your access to the Offerings without any notice or liability to you or any other person; and/or (ii) immediately suspend or terminate your User account and your access to the Offerings if you violate or otherwise fail to comply with these Terms of Use.`
  },
  {
    id: "amendments",
    title: "Amendments",
    content: `The Company reserves the right to amend, change and/or modify the terms of these Terms of Use at any time and from time to time in its sole discretion. Such amendments and modifications shall be effective immediately upon posting of the amended/modified agreement on the Product.

You agree to review these Terms of Use periodically to be aware of such amendments/modifications and your continued access and/or use of the Product shall be deemed your conclusive acceptance of the amended/modified agreement.`
  },
  {
    id: "governing-law",
    title: "Governing Law and Jurisdiction",
    content: `These Terms of Use shall be governed in all respects by applicable laws without giving effect to any conflicts of law principles that may require the application of the law of a different state or country.
    
    Any action arising from or relating to these Terms of Use must be brought in a competent court of law as determined by the specific agreement between the parties.`
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous Provisions",
    content: `These Terms of Use constitute the entire agreement between the Company and the User with respect to the subject matter hereof and supersedes and replaces all prior or contemporaneous understandings, agreements or communication, written or oral, regarding such subject matter.

If you should have any suggestions or questions regarding these Terms of Use, please contact the Company at nipurn.agarwal@100xprompt.com.`
  }
];

const tableOfContents = [
  { id: "permitted-users", title: "Permitted Users" },
  { id: "access", title: "Access" },
  { id: "fees-payment", title: "Fees and Payment" },
  { id: "cancellation", title: "Cancellation Policy" },
  { id: "ownership", title: "Ownership" },
  { id: "use-of-offerings", title: "Use of the Offerings" },
  { id: "unauthorised-use", title: "Unauthorised Use" },
  { id: "user-content", title: "User Content" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "indemnity", title: "Indemnity" },
  { id: "limitation", title: "Limitation of Liability" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "termination", title: "Termination" },
  { id: "amendments", title: "Amendments" },
  { id: "governing-law", title: "Governing Law" },
  { id: "miscellaneous", title: "Miscellaneous" },
];

export default function TermsOfUseView() {
  const [activeSection, setActiveSection] = useState<string>('permitted-users');
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -85% 0px', threshold: 0 }
    );

    const sections = mainContentRef.current?.querySelectorAll('section[id]');
    sections?.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MainLayout>
      <Seo pageKey="terms" />
      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8" style={{ background: `${GREEN}12`, color: GREEN }}>
              Legal
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}>
              Terms of Use
            </h1>
            <p className="text-gray-500 text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Updated on: 29th March, 2026
            </p>
          </m.div>

          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-16 p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${GREEN}08 0%, ${GREEN}03 100%)`, border: `1px solid ${GREEN}15` }}>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              This Terms of Use governs your use of our website <a href="https://100xprompt.com" className="underline" style={{ color: GREEN }}>https://100xprompt.com</a> ("Platform") and products offered through the Platform which are owned, controlled and operated by <strong>100X Prompt</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              By accessing or using the Offerings, you signify that you have read, understood and agree to be bound by these Terms of Use. If you do not agree with these Terms of Use, please do not access and/or use the Offerings.
            </p>
          </m.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            <m.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="hidden lg:block">
              <div className="sticky top-48">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contents</h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left py-2 px-3 rounded-lg transition-all group" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: isActive ? DARK : 'rgb(75 85 99)' }}>
                        <span className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all" style={{ background: isActive ? GREEN : 'transparent', boxShadow: isActive ? `0 0 8px ${GREEN}` : 'none' }} />
                          <span className={isActive ? 'font-medium' : 'font-normal group-hover:text-gray-900'}>{item.title}</span>
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </m.aside>

            <m.div ref={mainContentRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-16">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}>
                    {section.title}
                  </h2>
                  <div className="text-gray-600 leading-[1.9] whitespace-pre-line text-[16px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {section.content}
                  </div>
                </section>
              ))}
            </m.div>
          </div>

          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-16 pt-8 border-t border-gray-100 text-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to top
            </button>
          </m.div>
        </div>
      </main>

      <CTASection />
    </MainLayout>
  );
}
