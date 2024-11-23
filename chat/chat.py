from groq import Groq

def generate_text(messages, model):
        api_key='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'
        if not api_key:
            raise ValueError("API Not Found")

        client = Groq(api_key=api_key)
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=model
        )
        response_text = chat_completion.choices[0].message.content
        return response_text

    
import PyPDF2
from docx import Document  
from sentence_transformers import SentenceTransformer, util

def retrieve_relevant_paragraphs(file_path, query, top_k=1):
    """
    Retrieve the most relevant paragraphs from a PDF or Word document.

    Args:
    - file_path (str): Path to the file (.pdf or .docx).
    - query (str): User query.
    - top_k (int): Number of top paragraphs to return.

    Returns:
    - str: Concatenated relevant paragraphs.
    """
    text = ""

 
    if file_path.endswith(".pdf"):
       
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            for page in reader.pages:
                text += page.extract_text()
    elif file_path.endswith(".docx"):
        
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n\n"
    else:
        raise ValueError("Unsupported file type. Please use a .pdf or .docx file.")

    
    paragraphs = text.split("\n\n")

   
    model = SentenceTransformer('all-MiniLM-L6-v2')

 
    query_embedding = model.encode(query, convert_to_tensor=True)
    paragraph_embeddings = model.encode(paragraphs, convert_to_tensor=True)

    similarities = util.cos_sim(query_embedding, paragraph_embeddings)

    top_k_indices = similarities.argsort(descending=True)[0][:top_k]
    top_k_paragraphs = [paragraphs[i] for i in top_k_indices]

    content = " ".join(top_k_paragraphs)
    return content



def generate_llm_response(query):
    pdf_path = "./Direction.pdf"
    context = retrieve_relevant_paragraphs(pdf_path, query, top_k=1)
    
    prompt = "the context is: "+context+". now based on the context only try to answer the question: "+query
    d = [{"role": "user", "content": prompt}]
    model = 'llama-3.1-70b-versatile'

    generated_output = generate_text(d, model)

    return generated_output
