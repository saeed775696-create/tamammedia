import os
import re

files_to_process = [
    r'D:\tamammedia\src\app\services\creative\page.tsx',
    r'D:\tamammedia\src\app\services\integrated\page.tsx',
    r'D:\tamammedia\src\app\services\tech\page.tsx'
]

pattern = re.compile(r'<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}\s*/>')

for filepath in files_to_process:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add import Image if not exists
    if 'import Image from "next/image"' not in content:
        content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";')
    
    # Replace img with Image
    new_content = pattern.sub(r'<Image src="\1" alt="\2" width={60} height={60} style={{ borderRadius: 14, objectFit: "cover", marginBottom: 18 }} />', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")
