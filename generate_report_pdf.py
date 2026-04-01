#!/usr/bin/env python3
"""
Convert Markdown to PDF using markdown and weasyprint
"""

import sys
import os
from pathlib import Path

try:
    from markdown import markdown
    from weasyprint import WeasyPrint, HTML, CSS
    from io import BytesIO
    
    # Read markdown file
    md_file = Path('CHAT_DISCUSSION_REPORT.md')
    
    with open(md_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown(markdown_content, extensions=['extra', 'toc', 'tables'])
    
    # Add CSS styling
    css_styling = """
    <style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 2cm;
        max-width: 210mm;
    }
    h1 {
        color: #1e3a8a;
        border-bottom: 3px solid #3b82f6;
        padding-bottom: 10px;
        page-break-after: avoid;
    }
    h2 {
        color: #1e40af;
        margin-top: 20px;
        page-break-after: avoid;
    }
    h3 {
        color: #1e3a8a;
        page-break-after: avoid;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 15px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px 12px;
        text-align: left;
    }
    th {
        background-color: #f0f4f8;
        font-weight: bold;
    }
    code {
        background-color: #f5f5f5;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
    }
    pre {
        background-color: #f0f0f0;
        padding: 12px;
        border-radius: 5px;
        overflow-x: auto;
        border-left: 3px solid #3b82f6;
    }
    blockquote {
        border-left: 4px solid #3b82f6;
        margin-left: 0;
        padding-left: 15px;
        color: #555;
    }
    @page {
        size: A4;
        margin: 2cm;
        @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
        }
    }
    p {
        margin: 10px 0;
    }
    </style>
    """
    
    # Full HTML document
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        {css_styling}
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Generate PDF
    output_file = Path('CHAT_DISCUSSION_REPORT.pdf')
    HTML(string=full_html).write_pdf(str(output_file))
    
    file_size = output_file.stat().st_size / (1024 * 1024)  # Size in MB
    print(f"✓ PDF created successfully: {output_file.absolute()}")
    print(f"  File size: {file_size:.2f} MB")
    
except ImportError:
    print("Warning: weasyprint or markdown not found. Using alternative method...")
    try:
        # Try using simple HTML to PDF conversion
        from markdown import markdown
        
        md_file = Path('CHAT_DISCUSSION_REPORT.md')
        with open(md_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
        
        html_content = markdown(markdown_content)
        
        # Save as HTML first (can be opened and printed to PDF)
        html_file = Path('CHAT_DISCUSSION_REPORT.html')
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>KaryaSiddhi Chat Discussion Report</title>
                <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }}
                h1 {{ color: #1e3a8a; border-bottom: 2px solid #3b82f6; }}
                h2 {{ color: #1e40af; margin-top: 20px; }}
                table {{ border-collapse: collapse; width: 100%; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; }}
                th {{ background-color: #f0f0f0; }}
                code {{ background-color: #f5f5f5; padding: 2px 4px; }}
                </style>
            </head>
            <body>
                {html_content}
            </body>
            </html>
            """)
        
        print(f"✓ HTML created successfully: {html_file.absolute()}")
        print("  You can open this HTML file and print to PDF using your browser")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

except Exception as e:
    print(f"Error generating PDF: {e}")
    sys.exit(1)
