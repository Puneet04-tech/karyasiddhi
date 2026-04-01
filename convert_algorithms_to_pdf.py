#!/usr/bin/env python3
"""
Convert Algorithms Deep Dive Guide to PDF
Supports multiple fallback methods
"""

import os
import sys
from pathlib import Path

def method_1_weasyprint():
    """Try using weasyprint for HTML to PDF conversion"""
    try:
        from weasyprint import HTML, CSS
        import markdown
        
        # Read markdown
        md_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.md")
        with open(md_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Convert markdown to HTML
        html_content = markdown.markdown(md_content, extensions=['extra', 'codehilite'])
        
        # Wrap with CSS
        full_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Segoe UI', Arial, sans-serif; margin: 2cm; line-height: 1.6; }}
                h1 {{ color: #2c3e50; page-break-before: always; margin-top: 1cm; }}
                h2 {{ color: #34495e; margin-top: 1.5cm; margin-bottom: 0.5cm; }}
                h3 {{ color: #7f8c8d; margin-top: 1cm; }}
                code {{ background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New'; }}
                pre {{ background: #f4f4f4; padding: 12px; border-left: 3px solid #3498db; overflow-x: auto; }}
                table {{ border-collapse: collapse; width: 100%; margin: 1cm 0; }}
                td, th {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background: #3498db; color: white; }}
                p {{ text-align: justify; }}
                @page {{ size: A4; margin: 2cm; }}
            </style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # Save HTML first
        html_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.html")
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(full_html)
        
        # Convert HTML to PDF
        pdf_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.pdf")
        HTML(string=full_html).write_pdf(pdf_path)
        
        print(f"✓ PDF created successfully: {pdf_path}")
        print(f"✓ HTML also created: {html_path}")
        return True
        
    except Exception as e:
        print(f"✗ Weasyprint method failed: {e}")
        return False

def method_2_pandoc():
    """Try using pandoc for conversion"""
    try:
        import subprocess
        
        md_path = r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.md"
        pdf_path = r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.pdf"
        
        # Try pandoc with pdflatex engine
        cmd = [
            'pandoc',
            md_path,
            '-o', pdf_path,
            '--pdf-engine=pdflatex',
            '-V', 'geometry:margin=2cm',
            '-V', 'fontsize=11pt'
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ PDF created successfully with Pandoc: {pdf_path}")
            return True
        else:
            print(f"✗ Pandoc failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"✗ Pandoc method failed: {e}")
        return False

def method_3_html_fallback():
    """Fallback: Create printable HTML"""
    try:
        from pathlib import Path
        
        # Read markdown
        md_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.md")
        with open(md_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Simple markdown to HTML conversion (basic)
        html_content = md_content.replace('\n# ', '<h1>').replace('\n## ', '<h2>').replace('\n### ', '<h3>')
        html_content = html_content.replace('`', '<code>').replace('```', '<pre>')
        
        # Create full HTML document
        full_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Algorithms Deep Dive Guide</title>
            <style>
                @media print {{
                    body {{ margin: 2cm; }}
                    h1 {{ page-break-before: always; }}
                }}
                body {{ 
                    font-family: 'Segoe UI', Arial, sans-serif; 
                    margin: 2cm; 
                    line-height: 1.6;
                    max-width: 900px;
                    margin-left: auto;
                    margin-right: auto;
                }}
                h1 {{ color: #2c3e50; font-size: 28px; margin-top: 2cm; margin-bottom: 0.5cm; }}
                h2 {{ color: #34495e; font-size: 22px; margin-top: 1.5cm; margin-bottom: 0.5cm; }}
                h3 {{ color: #7f8c8d; font-size: 16px; margin-top: 1cm; }}
                code {{ background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New'; }}
                pre {{ background: #f4f4f4; padding: 12px; border-left: 3px solid #3498db; overflow-x: auto; }}
                table {{ border-collapse: collapse; width: 100%; margin: 1cm 0; }}
                td, th {{ border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }}
                th {{ background: #3498db; color: white; }}
                p {{ text-align: justify; margin: 0.5cm 0; }}
                ul, ol {{ margin: 0.5cm 0; padding-left: 2cm; }}
                li {{ margin: 0.25cm 0; }}
            </style>
        </head>
        <body>
            <h1>Algorithms Deep Dive Guide - KaryaSiddhi</h1>
            <p style="text-align: center; font-size: 12px; color: #7f8c8d;">
                Date: March 31, 2026 | Comprehensive Guide for Mentors & Stakeholders | 15+ Algorithms Explained
            </p>
            <hr>
            {md_content}
        </body>
        </html>
        """
        
        # Save HTML
        html_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.html")
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(full_html)
        
        print(f"\n✓ HTML created successfully: {html_path}")
        print(f"\n📌 TO CREATE PDF:")
        print(f"   1. Open the HTML file in your browser")
        print(f"   2. Press Ctrl+P to open print dialog")
        print(f"   3. Select 'Save as PDF'")
        print(f"   4. Save to: ALGORITHMS_DEEP_DIVE_GUIDE.pdf")
        print(f"\n✓ File ready for conversion: {html_path}")
        
        return True
        
    except Exception as e:
        print(f"✗ HTML fallback method failed: {e}")
        return False

def main():
    print("=" * 70)
    print("ALGORITHMS DEEP DIVE GUIDE - PDF CONVERSION")
    print("=" * 70)
    print()
    
    # Try methods in order of preference
    methods = [
        ("Weasyprint + Markdown", method_1_weasyprint),
        ("Pandoc", method_2_pandoc),
        ("HTML Fallback (Browser Print)", method_3_html_fallback),
    ]
    
    for method_name, method_func in methods:
        print(f"Attempting: {method_name}...")
        if method_func():
            print(f"✓ Success with {method_name}!")
            print("\n" + "=" * 70)
            return True
        print()
    
    print("✗ All automated methods failed")
    print("\nFallback: Using HTML export (see instructions above)")
    print("=" * 70)
    return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
