import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Solution {
    
    public static void main(String[] args) throws IOException {
        final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        final BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(System.out);
        final int starSize = Integer.parseInt(bufferedReader.readLine()) + 1;
        
        for (int i = starSize - 1; i > 0; i--) {
            String emptySpaces = "";
            
            if (i - 1 > 0)
                emptySpaces = String.format("%" + (i - 1) + "s", " ");
            
            final String hashTags = String.format("%" + (starSize - i) + "s", " ").replace(" ", "#");
            
            bufferedOutputStream.write((emptySpaces + hashTags + "\n").getBytes());
        }
        
        bufferedOutputStream.flush();
    }
}
