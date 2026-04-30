import {describe,it,expect} from 'vitest';
import {render,screen} from "@testing-library/react";
import {StatusBar} from "../../src/components/StatusBar";

describe('status bar component',()=>{
    it('should display the file name from the given path',()=>{
        render(<StatusBar filePath='/home/user/README.md' theme='github-light' fontSize={16}/>);
        expect(screen.getByText('README.md')).toBeInTheDocument();
    })

    it('should display a dash when no file is open',()=>{
        render(<StatusBar  filePath='' theme='github-light' fontSize={16}/>);
        expect(screen.getByText('_')).toBeInTheDocument();
    })

    it('should display zoom percentage from fontSize',()=>{
        render(<StatusBar filePath='' theme='github-light' fontSize={20}/>);
        expect(screen.getByText('125%')).toBeInTheDocument();
    })

    it('should display the current theme name',()=>{
        render(<StatusBar filePath='' theme='dracula' fontSize={16}/>);
        expect(screen.getByText('dracula')).toBeInTheDocument();
    })

    it('should show 100% zoom for default 16px font size',()=>{
        render(<StatusBar filePath='' theme='github-light' fontSize={16} />);
        expect(screen.getByText('100%')).toBeInTheDocument();
    })
})