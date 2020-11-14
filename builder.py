"""
    Build Function for webpages so that they can use the same header and footer on the same page
    @author: Ryan Purse
    Created On: 27/10/2020
"""

import os

header = "header.html"          # Directory to the header file
footer = "footer.html"          # Directory to the footer file
black_list = [header, footer]   # Removes files that do not need a header of footer
src_directory = "src/"          # Src page location
bld_directory = "portfolio/"    # build directory location


def get_pages():
    """
        Returns a list of html files that are in the root directory.
        Does not return anything that is within the black list
    """
    return [file for file in os.listdir(src_directory) if file.endswith(".html") and file not in black_list]


def build_page(page):
    """
        Reads each line of a file to look for any header or footer tags.
        Replaces the tags with the html within header.html or footer.html
        Provides a warning if it could not locate a header or footer.
        Copies the name of the src file and places it within the build directory.
    """
    page_file = open(src_directory + page, "r")
    build_file = open(bld_directory + page, "w")
    header_file = open(src_directory + header)
    footer_file = open(src_directory + footer)

    # Replaces anything wrapped in the header or footer
    header_found = False
    footer_found = False

    # Multiple headers or footers may be included
    header_warning = True
    footer_warning = True
    print("         Building " + page)
    for line in page_file.readlines():
        if "<header>" in line:
            header_found = True  # Set a flag until it has found </header>
            header_warning = False
        if "<footer>" in line:
            footer_found = True  # Set a flag until it has found </footer>
            footer_warning = False

        if not header_found and not footer_found:
            build_file.write(line)

        if header_found:
            if "</header>" in line:
                build_file.write(header_file.read())
                header_found = False
        if footer_found:
            if "</footer>" in line:
                build_file.write(footer_file.read())
                footer_found = False

    if header_warning:
        print("WARNING: Header Tags could not be located in " + page)
    if footer_warning:
        print("WARNING: Footer Tags could not be located in " + page)
    print("Finished Building " + page)


def main():
    if bld_directory[:-1:] not in os.listdir():
        os.mkdir(bld_directory)
    # loop through all pages
    [build_page(page) for page in get_pages()]


if __name__ == '__main__':
    main()
