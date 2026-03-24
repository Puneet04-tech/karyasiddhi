#!/usr/bin/env python3
"""Convert Markdown to PDF using reportlab"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
import re

def parse_markdown_to_pdf(md_file, pdf_file):
    """Parse markdown file and convert to PDF"""
    
    # Read markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create PDF document
    doc = SimpleDocTemplate(pdf_file, pagesize=letter, topMargin=0.75*inch, bottomMargin=0.75*inch)
    
    # Create styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading1_style = ParagraphStyle(
        'CustomHeading1',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=colors.HexColor('#1f4788'),
        spaceAfter=10,
        spaceBefore=10,
        fontName='Helvetica-Bold'
    )
    
    heading2_style = ParagraphStyle(
        'CustomHeading2',
        parent=styles['Heading2'],
        fontSize=13,
        textColor=colors.HexColor('#2c5aa0'),
        spaceAfter=8,
        spaceBefore=8,
        fontName='Helvetica-Bold'
    )
    
    heading3_style = ParagraphStyle(
        'CustomHeading3',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=colors.HexColor('#3d68b8'),
        spaceAfter=6,
        spaceBefore=6,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=10,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )
    
    code_style = ParagraphStyle(
        'Code',
        parent=styles['BodyText'],
        fontSize=8,
        fontName='Courier',
        textColor=colors.HexColor('#333333'),
        leftIndent=20,
        spaceAfter=6,
        backColor=colors.HexColor('#f5f5f5')
    )
    
    # Parse content into story
    story = []
    
    lines = content.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Skip empty lines at start
        if not line.strip():
            story.append(Spacer(1, 0.1*inch))
            i += 1
            continue
        
        # Parse headers
        if line.startswith('# '):
            title = line.replace('# ', '').strip()
            story.append(Paragraph(title, title_style))
            i += 1
            continue
        
        if line.startswith('## '):
            heading = line.replace('## ', '').strip()
            story.append(Paragraph(heading, heading1_style))
            i += 1
            continue
        
        if line.startswith('### '):
            heading = line.replace('### ', '').strip()
            story.append(Paragraph(heading, heading2_style))
            i += 1
            continue
        
        if line.startswith('#### '):
            heading = line.replace('#### ', '').strip()
            story.append(Paragraph(heading, heading3_style))
            i += 1
            continue
        
        # Parse code blocks
        if line.startswith('```'):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                code_lines.append(lines[i])
                i += 1
            
            code_text = '\n'.join(code_lines).strip()
            if code_text:
                # Split long code blocks
                for code_line in code_text.split('\n'):
                    if code_line.strip():
                        story.append(Paragraph(code_line, code_style))
                    else:
                        story.append(Spacer(1, 0.05*inch))
            
            i += 1  # Skip closing ```
            continue
        
        # Parse regular paragraphs
        if line.strip() and not line.startswith('|'):
            # Clean up inline formatting
            para_text = line.strip()
            para_text = para_text.replace('**', '')  # Remove bold markers
            para_text = para_text.replace('_', '')   # Remove italic markers
            para_text = para_text.replace('`', '')   # Remove code markers
            
            if para_text:
                story.append(Paragraph(para_text, body_style))
            i += 1
            continue
        
        i += 1
    
    # Build PDF
    doc.build(story)
    print(f"✓ PDF created successfully: {pdf_file}")

if __name__ == '__main__':
    import sys
    
    md_file = r'd:\karyasiddhi\KaryaSiddhi_Theoretical_Architecture.md'
    pdf_file = r'd:\karyasiddhi\KaryaSiddhi_Theoretical_Architecture.pdf'
    
    try:
        parse_markdown_to_pdf(md_file, pdf_file)
        print(f"\nPDF file size: {__import__('os').path.getsize(pdf_file) / 1024:.1f} KB")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
